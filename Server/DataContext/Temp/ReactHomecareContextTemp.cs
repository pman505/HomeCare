// using System;
// using System.Collections.Generic;
// using Microsoft.EntityFrameworkCore;
// using Server.Models.Temp;

// namespace Server.DataContext.Temp;

// public partial class ReactHomecareContextTemp : DbContext
// {
//     public ReactHomecareContextTemp()
//     {
//     }

//     public ReactHomecareContextTemp(DbContextOptions<ReactHomecareContextTemp> options)
//         : base(options)
//     {
//     }

//     public virtual DbSet<Resident> Residents { get; set; }

//     public virtual DbSet<ResidentWeight> ResidentWeights { get; set; }

//     public virtual DbSet<User> Users { get; set; }

//     protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//         => optionsBuilder.UseNpgsql("");

//     protected override void OnModelCreating(ModelBuilder modelBuilder)
//     {
//         modelBuilder.Entity<Resident>(entity =>
//         {
//             entity.HasKey(e => e.Id).HasName("resident_pkey");

//             entity.ToTable("resident");

//             entity.Property(e => e.Id).HasColumnName("id");
//             entity.Property(e => e.Dob).HasColumnName("dob");
//             entity.Property(e => e.FirstName)
//                 .HasColumnType("character varying")
//                 .HasColumnName("first_name");
//             entity.Property(e => e.LastName)
//                 .HasColumnType("character varying")
//                 .HasColumnName("last_name");
//             entity.Property(e => e.MiddleName)
//                 .HasColumnType("character varying")
//                 .HasColumnName("middle_name");
//             entity.Property(e => e.Photo)
//                 .HasColumnType("character varying")
//                 .HasColumnName("photo");
//         });

//         modelBuilder.Entity<ResidentWeight>(entity =>
//         {
//             entity.HasKey(e => new { e.ResidentId, e.Date }).HasName("resident_weight_pkey");

//             entity.ToTable("resident_weight");

//             entity.Property(e => e.ResidentId).HasColumnName("resident_id");
//             entity.Property(e => e.Date).HasColumnName("date");
//             entity.Property(e => e.Weight)
//                 .HasPrecision(5, 2)
//                 .HasColumnName("weight");

//             entity.HasOne(d => d.Resident).WithMany(p => p.ResidentWeights)
//                 .HasForeignKey(d => d.ResidentId)
//                 .OnDelete(DeleteBehavior.ClientSetNull)
//                 .HasConstraintName("resident_weight_resident_id_fkey");
//         });

//         modelBuilder.Entity<User>(entity =>
//         {
//             entity.HasKey(e => e.UserId).HasName("user_pkey");

//             entity.ToTable("user");

//             entity.Property(e => e.UserId).HasColumnName("user_id");
//             entity.Property(e => e.FirstName)
//                 .HasColumnType("character varying")
//                 .HasColumnName("first_name");
//             entity.Property(e => e.LastName)
//                 .HasColumnType("character varying")
//                 .HasColumnName("last_name");
//             entity.Property(e => e.MiddleName)
//                 .HasColumnType("character varying")
//                 .HasColumnName("middle_name");
//             entity.Property(e => e.Password)
//                 .HasColumnType("character varying")
//                 .HasColumnName("password");
//             entity.Property(e => e.UserName)
//                 .HasColumnType("character varying")
//                 .HasColumnName("user_name");
//         });

//         OnModelCreatingPartial(modelBuilder);
//     }

//     partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
// }
