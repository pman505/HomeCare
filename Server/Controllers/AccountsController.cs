using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DataContext;
using Server.Models;
using Server.Services;


namespace Server.Controllers;

[Route("api/[controller]")]
[ApiController]

public class AccountsController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly AuthService _authService;
    private readonly UserManager<User> _userManager;
    public AccountsController(IConfiguration configuration, AuthService authService, UserManager<User> userManager)
    {
        _configuration = configuration;
        _authService = authService;
        _userManager = userManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        Console.WriteLine($"UserName is {dto.UserName}");
        Console.WriteLine($"Password is {dto.Password}");
        // Console.WriteLine(_configuration["Jwt:Key"]);
        var userToken = await _authService.LoginAsync(dto);

        if (userToken.user == null || userToken.token == null) return Unauthorized("Invalid Credentials");

        Response.Cookies.Append("access_token", userToken.token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.AddHours(1)
        });

        return Ok(new
        {
            message = "Logged in successfully",
            userFN = userToken.user.FirstName,
        });
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("access_token");
        return Ok();
    }

    [HttpPost("create")]
    public async Task<IResult> Create()
    {
        return await _authService.CreateUser();
    }

    [Authorize]
    [HttpGet("credcheck")]
    public async Task<IActionResult> CredCheck()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var username = User.Identity?.Name;
        Console.WriteLine(userId);
        Console.WriteLine(username);

        if (userId == null)
            return Unauthorized();
        var user = await _userManager.FindByIdAsync(userId);

        if(user == null)
        {
            return Unauthorized();
        }
        
        return Ok(new
        {
            message = "Logged in upon refresh",
            userFN = user.FirstName,
        });
    }
}

public class LoginDto
{
    public string? UserName { get; set; }
    public string? Password { get; set; }
}

public class AuthResult
{
    public bool IsSuccess { get; set; }
    public string? Token { get; set; }
    public IEnumerable<string>? Errors { get; set; }

}

/*

public class TokenService
{
    public string CreateToken(ApplicationUser user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email)
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}


*/


/*

useEffect(() => {
    fetch("/api/accounts/credcheck", {
        credentials: "include"
    })
    .then(res => {
        if (res.ok) {
            return res.json(); // return the promise
        } else {
            throw new Error("Not authenticated");
        }
    })
    .then(data => {
        console.log(data.userFN);
        alert(data.userFN);
    })
    .catch(err => {
        console.error(err);
    });

}, []);

*/