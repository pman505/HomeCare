using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Controllers;
using Server.DataContext;
using Server.Models;

namespace Server.Services;

public class AuthService
{
    private readonly UserManager<User> _userManager;
    private readonly TokenService _tokenService;

    public AuthService(UserManager<User> userManager, TokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    public async Task<IResult> CreateUser()
    {
        // var user = new User
        // {
        //     FirstName = "Prabhat",
        //     LastName = "Mandal",
        //     UserName = "pp",
        // };

        var user = new User
        {
            FirstName = "UserFN",
            LastName = "USERLN",
            UserName = "T-USER",
        };

        IdentityResult identityResult = await _userManager.CreateAsync(user, "ppwPPW12#");
        if (!identityResult.Succeeded) return Results.BadRequest(identityResult.Errors);

        return Results.Ok(user);
    }

    public async Task<(string? token, User? user)> LoginAsync(LoginDto dto)
    {
        Console.WriteLine($"UserName: {dto.UserName}  Password: {dto.Password}");
        if (dto.UserName != null && dto.Password != null)
        {
            var user = await _userManager.FindByNameAsync(dto.UserName);

            if (user == null) return (null, null);

            var validPassword = await _userManager.CheckPasswordAsync(user, dto.Password);

            if (!validPassword) return (null, null);

            return (_tokenService.CreateToken(user), user);
        }
        return (null, null);
    }
}
