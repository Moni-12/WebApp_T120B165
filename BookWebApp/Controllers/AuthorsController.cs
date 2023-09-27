using BookWebApp.Data.Entities;
using BookWebApp.Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using static BookWebApp.Data.Dtos.Authors.AuthorsDto;

namespace BookWebApp.Controllers
{
    /*
    /api/authors GET List 200
    /api/authors/{id} GET One 200
    /api/authors POST Create 201
    /api/authors/{id} PUT/PATCH Modify 200
    /api/authors/{id} DELTE Remove 200/204
    */

    [ApiController]
    [Route("api/authors")]
    public class AuthorsController : ControllerBase
    {
        private readonly IAuthorsRepository _authorsRepository;

        public AuthorsController(IAuthorsRepository authorsRepository)
        {
            _authorsRepository = authorsRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<AuthorDto>> GetAll()
        {
            var authors = await _authorsRepository.GetListAsync();
            return authors.Select(o => new AuthorDto(o.Id, o.FirstName, o.LastName, o.DateOfBirth, o.AboutAuthor));
        }

        [HttpGet]
        [Route("{authorId}", Name = "GetAuthor")]
        public async Task<ActionResult<AuthorDto>> GetOne(int authorId)
        {
            var author = await _authorsRepository.GetOneAsync(authorId);

            if (author == null)
            {
                return NotFound(); // 404
            }

            return new AuthorDto(author.Id, author.FirstName, author.LastName, author.DateOfBirth, author.AboutAuthor);
        }

        [HttpPost]
        public async Task<ActionResult<AuthorDto>> Create(CreateAuthorDto createAuthorDto)
        {
            var author = new Author
            {
                FirstName = createAuthorDto.FirstName,
                LastName = createAuthorDto.LastName,
                DateOfBirth = createAuthorDto.DateOfBirth,
                AboutAuthor = createAuthorDto.AboutAuthor
            };

            await _authorsRepository.CreateAsync(author);

            // 201
            return Created("", new AuthorDto(author.Id, author.FirstName, author.LastName, author.DateOfBirth, author.AboutAuthor));
        }

        [HttpPut]
        [Route("{authorId}")]
        public async Task<ActionResult<AuthorDto>> Update(int authorId, UpdateAuthorDto updateAuthorDto)
        {
            var author = await _authorsRepository.GetOneAsync(authorId);

            if (author == null)
            {
                return NotFound(); // 404
            }

            author.AboutAuthor = updateAuthorDto.AboutAuthor;
            await _authorsRepository.UpdateAsync(author);

            return Ok(new AuthorDto(author.Id, author.FirstName, author.LastName, author.DateOfBirth, author.AboutAuthor));
        }

        [HttpDelete]
        [Route("{authorId}")]
        public async Task<ActionResult> Delete(int authorId)
        {
            var author = await _authorsRepository.GetOneAsync(authorId);

            if (author == null)
            {
                return NotFound(); // 404
            }

            await _authorsRepository.DeleteAsync(author);

            // 204
            return NoContent();
        }
    }
}
