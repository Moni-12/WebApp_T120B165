using BookWebApp.Auth;
using BookWebApp.Auth.Model;
using BookWebApp.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static BookWebApp.Auth.Model.AuthDtos;
using static BookWebApp.Data.Dtos.Authors.AuthorsDto;

namespace BookWebApp.Controllers
{
    [ApiController]
    [Route("api")]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ForumRestUser> _userManager;
        private readonly IJwtTokenService _jwtTokenService;

        public AuthController(UserManager<ForumRestUser> userManager, IJwtTokenService jwtTokenService)
        {
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register (RegisterUserDto registerUserDto)
        {
            var user = await _userManager.FindByNameAsync(registerUserDto.UserName);
            if (user != null)
            {
                return BadRequest("Request invalid");
            }

            var newUser = new ForumRestUser
            {
                Email = registerUserDto.Email,
                UserName = registerUserDto.UserName
            };
            var createUserResult = await _userManager.CreateAsync(newUser, registerUserDto.Password);
            if (!createUserResult.Succeeded)
            {
                return BadRequest("Could not create a user.");
            }

            await _userManager.AddToRoleAsync(newUser, ForumRoles.ForumUser);

            return CreatedAtAction(nameof(Register), new UserDto(newUser.Id, newUser.UserName, newUser.Email));
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if (user == null)
            {
                return BadRequest("Username or password is invalid.");
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!isPasswordValid)
            {
                return BadRequest("Username or password is invalid.");
            }

            var roles = await _userManager.GetRolesAsync(user);
            var accessToken = _jwtTokenService.CreateAccessToken(user.UserName, user.Id, roles);

            return Ok(new SuccessfullLoginDto(accessToken));
        }
    }
}
