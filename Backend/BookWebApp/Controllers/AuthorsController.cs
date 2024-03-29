﻿using BookWebApp.Auth.Model;
using BookWebApp.Data.Entities;
using BookWebApp.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.Win32;
using System.Security.Claims;
using static BookWebApp.Auth.Model.AuthDtos;
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
            return authors.Select(o => new AuthorDto(o.Id, o.FirstName, o.LastName, o.DateOfBirth, o.AboutAuthor, o.PictureBase64));
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

            return new AuthorDto(author.Id, author.FirstName, author.LastName, author.DateOfBirth, author.AboutAuthor, author.PictureBase64);
        }

        [HttpPost]
        [Authorize(Roles = ForumRoles.Admin)]
        public async Task<ActionResult<AuthorDto>> Create(CreateAuthorDto createAuthorDto)
        {
            var author = new Author
            {
                FirstName = createAuthorDto.FirstName,
                LastName = createAuthorDto.LastName,
                DateOfBirth = createAuthorDto.DateOfBirth.ToUniversalTime(),
                AboutAuthor = createAuthorDto.AboutAuthor,
                PictureBase64 = createAuthorDto.PictureBase64
            };

            await _authorsRepository.CreateAsync(author);

            // 201
            //return CreatedAtAction("", new AuthorDto(author.Id, author.FirstName, author.LastName, author.DateOfBirth, author.AboutAuthor));
            return Created("", new AuthorDto(author.Id, author.FirstName, author.LastName, author.DateOfBirth, author.AboutAuthor, author.PictureBase64));
        }

        [HttpPut]
        [Route("{authorId}")]
        [Authorize(Roles = ForumRoles.Admin)]
        public async Task<ActionResult<AuthorDto>> Update(int authorId, UpdateAuthorDto updateAuthorDto)
        {
            var author = await _authorsRepository.GetOneAsync(authorId);

            if (author == null)
            {
                return NotFound(); // 404
            }

            author.AboutAuthor = updateAuthorDto.AboutAuthor;
            await _authorsRepository.UpdateAsync(author);

            return Ok(new AuthorDto(author.Id, author.FirstName, author.LastName, author.DateOfBirth, author.AboutAuthor, author.PictureBase64));
        }

        [HttpDelete]
        [Route("{authorId}")]
        [Authorize(Roles = ForumRoles.Admin)]
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
