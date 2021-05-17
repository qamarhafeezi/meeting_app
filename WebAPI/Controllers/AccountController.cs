using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.DTOs;
using WebAPI.Entities;

namespace WebAPI.Controllers
{
    public class AccountController : BaseApiController
    {
        public DataContext _context { get; }
        public AccountController(DataContext context )
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register( RegisterDto registerDto)
        {
            if(await UserExists(registerDto.UserName)) return BadRequest ("User Name is not available");

            using var hmc = new HMACSHA512();
            var user = new AppUser()
            {
                UserName = registerDto.UserName.ToLower(),
                PasswordHash = hmc.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmc.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;

        }

        private async Task<bool> UserExists(string userName)
        {
            return await _context.Users.AnyAsync(
                x => x.UserName == userName.ToLower()
                );
        }
    }
}