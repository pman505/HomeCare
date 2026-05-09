using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Server.DataContext;

public partial class ReactHomecareContext : IdentityDbContext<User>
{
    // private readonly string connectionString;
    public ReactHomecareContext(IConfiguration configuration, DbContextOptions<ReactHomecareContext> options)
        : base(options)
    {
        // connectionString = configuration.GetConnectionString("DefaultConnection")!;
    }

    public virtual DbSet<Resident> Residents { get; set; }
    public virtual DbSet<ResidentWeight> ResidentWeights { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Resident>().ToTable("Residents", schema: "resident");
        modelBuilder.Entity<ResidentWeight>().ToTable("ResidentWeights", schema: "resident");
        modelBuilder.Entity<User>().ToTable("Users", schema: "auth");
        modelBuilder.Entity<IdentityRole>().ToTable("Roles", "auth");
        modelBuilder.Entity<IdentityUserRole<string>>().ToTable("UserRoles", "auth");
        modelBuilder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims", "auth");
        modelBuilder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims", "auth");
        modelBuilder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins", "auth");
        modelBuilder.Entity<IdentityUserToken<string>>().ToTable("UserTokens", "auth");
    }

    // partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
