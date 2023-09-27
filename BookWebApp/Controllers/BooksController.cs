using BookWebApp.Data.Dtos.Books;
using BookWebApp.Data.Entities;
using BookWebApp.Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using static BookWebApp.Data.Dtos.Books.BooksDto;

namespace BookWebApp.Controllers
{
    /*
    /api/authors/{authorId}/books GET List 200
    /api/authors/{authorId}/books/{id} GET One 200
    /api/authors/{authorId}/books POST Create 201
    /api/authors/{authorId}/books/{id} PUT/PATCH Modify 200
    /api/authors/{authorId}/books/{id} DELTE Remove 200/204
    */

    [ApiController]
    [Route("api/authors/{authorId}/books")]
    public class BooksController : ControllerBase
    {
        private readonly IAuthorsRepository _authorsRepository;
        private readonly IBooksRepository _booksRepository;

        public BooksController(IAuthorsRepository authorsRepository, IBooksRepository booksRepository)
        {
            _authorsRepository = authorsRepository;
            _booksRepository = booksRepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll(int authorId)
        {
            var author = await _authorsRepository.GetOneAsync(authorId);
            if (author == null)
            {
                return NotFound(); // 404
            }
            
            var books = await _booksRepository.GetListAsync(authorId);
            
            return Ok(books.Select(o => new BookDto(o.Id, o.Title, o.Description, o.ReleaseDate, o.Genre, o.Author)));
        }

        [HttpGet]
        [Route("{bookId}")]
        public async Task<ActionResult<BookDto>> GetOne(int authorId, int bookId)
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

            return new BookDto(book.Id, book.Title, book.Description, book.ReleaseDate, book.Genre, book.Author);
        }

        [HttpPost]
        public async Task<ActionResult<BookDto>> Create(int authorId, CreateBookDto createBookDto)
        {
            var author = await _authorsRepository.GetOneAsync(authorId);
            if (author == null)
            {
                return NotFound(); // 404
            }

            var book = new Book
            {
                Title = createBookDto.Title,
                Description = createBookDto.Description,
                ReleaseDate = createBookDto.ReleaseDate,
                Genre = createBookDto.Genre,
                Author = author
            };

            await _booksRepository.CreateAsync(book);

            // 201
            return Created("", new BookDto(book.Id, book.Title, book.Description, book.ReleaseDate, book.Genre, book.Author));
        }

        [HttpPut]
        [Route("{bookId}")]
        public async Task<ActionResult<BookDto>> Update(int authorId, int bookId, UpdateBookDto updateBookDto)
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

            book.Description = updateBookDto.Description;
            book.Genre = updateBookDto.Genre;

            await _booksRepository.UpdateAsync(book);

            return Ok(new BookDto(book.Id, book.Title, book.Description, book.ReleaseDate, book.Genre, book.Author));
        }

        [HttpDelete]
        [Route("{bookId}")]
        public async Task<ActionResult> Delete(int authorId, int bookId)
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

            await _booksRepository.DeleteAsync(book);

            // 204
            return NoContent();
        }
    }
}
