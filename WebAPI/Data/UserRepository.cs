using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Entities;
using WebAPI.Interfaces;

namespace WebAPI.Data
{
    public class UserRepository : IUserRepository
    {
        public DataContext _context { get; }
        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUserNameAsync(string userName)
        {
            return await _context.Users
            .Include(p => p.Photos)
            .SingleOrDefaultAsync(x => x.UserName == userName);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
            .Include(p => p.Photos).
            ToListAsync<AppUser>();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}