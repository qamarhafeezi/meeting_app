using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.DTOs;
using WebAPI.Entities;
using WebAPI.Helpers;

namespace WebAPI.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        public Task<AppUser> GetUserByIdAsync(int Id);
        public Task<IEnumerable<AppUser>> GetUsersAsync();
        public Task<bool> SaveAllAsync();
        Task<AppUser> GetUserByUserNameAsync(string userName);
        Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
        Task<MemberDto> GetMemberAsync(string userName);
    }
}