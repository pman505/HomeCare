using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DataContext;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
  private ReactHomecareContext _context;

  public TestController(ReactHomecareContext context)
  {
    _context = context;
  }

  [HttpGet("hello")]
  public IActionResult GetHello()
  {
    return Ok(new { message = "Hello from backend!" });
  }

  [HttpGet("getuser")]
  public async Task<IActionResult> GetUser()
  {
    var user = await _context.Users.FirstOrDefaultAsync();
    // Console.WriteLine(user?.FirstName);
    return Ok(user);
  }
}