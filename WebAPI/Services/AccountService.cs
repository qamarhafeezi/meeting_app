using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Interfaces;

namespace WebAPI.Services
{
    public class AccountService : IAccountService
    {
        private readonly DataContext _dbContext;
        public AccountService(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> UserExists(string userName)
        {
            return await _dbContext.Users.AnyAsync(
                 x => x.UserName == userName.ToLower()
                 );
        }
    }
}