using System;
using System.Collections.Generic;

namespace Server.Models.Temp;

public partial class Resident
{
    public int Id { get; set; }

    public string? FirstName { get; set; }

    public string? MiddleName { get; set; }

    public string? LastName { get; set; }

    public DateOnly? Dob { get; set; }

    public string? Photo { get; set; }

    public virtual ICollection<ResidentWeight> ResidentWeights { get; set; } = new List<ResidentWeight>();
}
