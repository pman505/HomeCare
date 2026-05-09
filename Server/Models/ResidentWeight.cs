using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class ResidentWeight
{
    public int Id { get; set; }
    public int ResidentId { get; set; }
    public DateTime DateTime { get; set; }
    public decimal Weight { get; set; }
    public virtual Resident Resident { get; set; } = null!;
}
