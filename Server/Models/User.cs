using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Server.Models;

public partial class User: IdentityUser
{

    public string FirstName { get; set; } = null!;

    public string? MiddleName { get; set; }

    public string LastName { get; set; } = null!;
}
