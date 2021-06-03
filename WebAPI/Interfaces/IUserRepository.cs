using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Entities;

namespace WebAPI.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        public Task<AppUser> GetUserByIdAsync(int Id);
        public Task<IEnumerable<AppUser>> GetUsersAsync();
        public Task<bool> SaveAllAsync();
        Task<AppUser> GetUserByUserNameAsync(string userName);
    }
}