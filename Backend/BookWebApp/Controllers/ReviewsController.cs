using BookWebApp.Auth.Model;
using BookWebApp.Data.Dtos.Reviews;
using BookWebApp.Data.Entities;
using BookWebApp.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using System.Security.Claims;
using static BookWebApp.Data.Dtos.Books.BooksDto;
using static BookWebApp.Data.Dtos.Reviews.ReviewsDto;

namespace BookWebApp.Controllers
{
    /*
    /api/authors/{authorId}/books/{bookId}/reviews GET List 200
    /api/authors/{authorId}/books/{bookId}/reviews/{id} GET One 200
    /api/authors/{authorId}/books/{bookId}/reviews POST Create 201
    /api/authors/{authorId}/books/{bookId}/reviews/{id} PUT/PATCH Modify 200
    /api/authors/{authorId}/books/{bookId}/reviews/{id} DELTE Remove 200/204
    */

    [ApiController]
    [Route("api/authors/{authorId}/books/{bookId}/reviews")]
    public class ReviewsController : ControllerBase
    {
        private readonly IAuthorsRepository _authorsRepository;
        private readonly IBooksRepository _booksRepository;
        private readonly IReviewsRepository _reviewsRepository;
        private readonly IAuthorizationService _authorizationService;

        public ReviewsController(IAuthorsRepository authorsRepository, IBooksRepository booksRepository, IReviewsRepository reviewsRepository,
            IAuthorizationService authorizationService)
        {
            _authorsRepository = authorsRepository;
            _booksRepository = booksRepository;
            _reviewsRepository = reviewsRepository;
            _authorizationService = authorizationService;
        }


        [HttpGet]
        public async Task<ActionResult> GetAll(int authorId, int bookId)
        {
            var author = await _authorsRepository.GetOneAsync(authorId);
            if (author == null)
            {
                return NotFound(); // 404
            }
            var book = await _booksRepository.GetOneAsync(authorId, bookId);
            if (book == null)
            {
                return NotFound(); // 404
            }

            var reviews = await _reviewsRepository.GetListAsync(bookId);

            return Ok(reviews.Select(o => new ReviewDto(o.Id, o.Content, o.CreationDate, o.Book)));
        }

        [HttpGet]
        [Route("{reviewId}")]
        public async Task<ActionResult<ReviewDto>> GetOne(int authorId, int bookId, int reviewId)
        {
            var author = await _authorsRepository.GetOneAsync(authorId);
            if (author == null)
            {
                return NotFound(); // 404
            }
            var book = await _booksRepository.GetOneAsync(authorId, bookId);
            if (book == null)
            {
                return NotFound(); // 404
            }
            var review = await _reviewsRepository.GetOneAsync(bookId, reviewId);
            if (review == null)
            {
                return NotFound(); // 404
            }

            return new ReviewDto(review.Id, review.Content, review.CreationDate, review.Book);
        }

        [HttpPost]
        [Authorize(Roles = ForumRoles.ForumUser)]
        public async Task<ActionResult<ReviewDto>> Create(int authorId, int bookId, CreateReviewDto createReviewDto)
        {
            var author = await _authorsRepository.GetOneAsync(authorId);
            if (author == null)
            {
                return NotFound(); // 404
            }
            var book = await _booksRepository.GetOneAsync(authorId, bookId);
            if (book == null)
            {
                return NotFound(); // 404
            }

            var review = new Review
            {
                Content = createReviewDto.Content,
                CreationDate = DateTime.UtcNow,
                Book = book,
                UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            };

            await _reviewsRepository.CreateAsync(review);

            // 201
            return Created("", new ReviewDto(review.Id, review.Content, review.CreationDate, review.Book));
        }

        [HttpPut]
        [Route("{reviewId}")]
        [Authorize(Roles = ForumRoles.ForumUser)]
        public async Task<ActionResult<ReviewDto>> Update(int authorId, int bookId, int reviewId, UpdateReviewDto updateReviewDto)
        {
            var author = await _authorsRepository.GetOneAsync(authorId);
            if (author == null)
            {
                return NotFound(); // 404
            }
            var book = await _booksRepository.GetOneAsync(authorId, bookId);
            if (book == null)
            {
                return NotFound(); // 404
            }
            var review = await _reviewsRepository.GetOneAsync(bookId, reviewId);
            if (review == null)
            {
                return NotFound(); // 404
            }

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, review, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded)
            {
                return Forbid(); // 403
            }


            review.Content = updateReviewDto.Content;

            await _reviewsRepository.UpdateAsync(review);

            return Ok(new ReviewDto(review.Id, review.Content, review.CreationDate, review.Book));
        }

        [HttpDelete]
        [Route("{reviewId}")]
        [Authorize(Roles = ForumRoles.ForumUser)]
        public async Task<ActionResult> Delete(int authorId, int bookId, int reviewId)
        {
            var author = await _authorsRepository.GetOneAsync(authorId);
            if (author == null)
            {
                return NotFound(); // 404
            }
            var book = await _booksRepository.GetOneAsync(authorId, bookId);
            if (book == null)
            {
                return NotFound(); // 404
            }
            var review = await _reviewsRepository.GetOneAsync(bookId, reviewId);
            if (review == null)
            {
                return NotFound(); // 404
            }

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, review, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded)
            {
                return Forbid(); // 403
            }

            await _reviewsRepository.DeleteAsync(review);

            // 204
            return NoContent();
        }
    }
}
