using System;
using System.Collections.Generic;

namespace Server.Models.Temp;

public partial class ResidentWeight
{
    public int ResidentId { get; set; }

    public DateOnly Date { get; set; }

    public decimal Weight { get; set; }

    public virtual Resident Resident { get; set; } = null!;
}
