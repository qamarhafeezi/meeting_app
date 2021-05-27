using System.Threading.Tasks;

namespace WebAPI.Interfaces
{
    public interface IAccountService
    {
        public Task<bool> UserExists(string userName);
    }
}