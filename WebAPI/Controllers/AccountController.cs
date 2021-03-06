using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.DTOs;
using WebAPI.Entities;
using WebAPI.Interfaces;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    public class AccountController : BaseApiController
    {
        public DataContext _context { get; }
        public ITokenService _tokenService { get; }
        private readonly IAccountService _accountService;

        public AccountController(DataContext context, ITokenService tokenService, IAccountService accountService)
        {
            _accountService = accountService;
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _accountService.UserExists(registerDto.UserName)) return BadRequest("User Name is not available");

            using var hmc = new HMACSHA512();
            var user = new AppUser()
            {
                UserName = registerDto.UserName.ToLower(),
                PasswordHash = hmc.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmc.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user),
                Gender = user.Gender,
                KnownAs = user.KnownAs
            };

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.Include(p => p.Photos).SingleOrDefaultAsync
            (x => x.UserName == loginDto.UserName.ToLower());
            if (user == null)
            {
                return Unauthorized("User not found");
            }
            using var hmc = new HMACSHA512(user.PasswordSalt);
            var hash = hmc.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < hash.Length; i++)
            {
                if (hash[i] != user.PasswordHash[i])
                {
                    return Unauthorized("Invalid Password");
                }
            }

            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain == true) == null ? "" :
                user.Photos.FirstOrDefault(x => x.IsMain == true).Url,
                Gender = user.Gender,
                KnownAs = user.KnownAs
            };
        }

    }
}