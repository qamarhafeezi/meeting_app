using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Controllers
{
    
    public class UsersController : BaseApiController
    {
        private DataContext _context { get; }
        public UsersController(DataContext context )
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
        
        public async Task<ActionResult<AppUser>> GetUser(int Id)
        {
            return await _context.Users.FindAsync(Id);
        }
    }
}