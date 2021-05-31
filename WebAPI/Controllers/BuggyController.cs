using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Controllers
{
    public class BuggyController : BaseApiController
    {
        public DataContext _context { get; set; }
        public BuggyController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "this is secret";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var appUser = _context.Users.Find(-1);
            if (appUser == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(appUser);
            }
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var appUser = _context.Users.Find(-1);
            return appUser.ToString();
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This is bad request");
        }

    }
}