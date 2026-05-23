using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DataContext;
using Server.Models;
using Server.Services;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ResidentsController : ControllerBase
    {
        private ReactHomecareContext _context;
        private ResidentService _residentService;
        private readonly IWebHostEnvironment _env;


        public ResidentsController(ReactHomecareContext context, ResidentService residentService, IWebHostEnvironment env)
        {
            _context = context;
            _residentService = residentService;
            _env = env;
        }

        [HttpGet("GetResidents")]
        public async Task<IActionResult> GetResidents()
        {
            Console.WriteLine("Protected Endpoint Hit");
            var residents = await _context.Residents.ToListAsync();
            return Ok(residents);
        }

        [HttpGet("GetResident")]
        public async Task<IActionResult> GetResident(int id)
        {
            var resident = await _context.Residents.FirstOrDefaultAsync(x => x.Id == id);
            // Console.WriteLine($"Hit GetResident {resident.Id}");
            return Ok(resident);
        }

        [HttpPost("AddResident")]
        public async Task<IActionResult> AddResident([FromForm] ResidentDto dto)
        {
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.Photo.FileName);
            var uploadsPath = Path.Combine(_env.ContentRootPath, "uploads", "residents");
            Directory.CreateDirectory(uploadsPath);
            var filePath = Path.Combine(uploadsPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.Photo.CopyToAsync(stream);
            }

            var resident = new Resident
            {
                FirstName = dto.FirstName,
                MiddleName = dto.MiddleName,
                LastName = dto.LastName,
                Dob = dto.Dob,
                Photo = "/uploads/residents/" + fileName
            };

            _context.Residents.Add(resident);
            await _context.SaveChangesAsync();

            return Ok(resident);
        }

        [HttpDelete("DeleteResident")]
        public IActionResult DeleteResident(int id)
        {
            var resident = _context.Residents.First(x => x.Id == id);
            if (resident != null)
            {
                _context.Residents.Remove(resident);
            }
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet("GetWeightHistory")]
        public async Task<IActionResult> GetWeight(int id)
        {
            var weightHistory = await _residentService.WeightHistory(id);
            // var weightHistory = await _context.ResidentWeights.ToListAsync();
            Console.WriteLine($"Weight History for id {id}");
            return Ok(weightHistory);
        }
    }

    public class ResidentDto
    {
        public string? FirstName { get; set; }

        public string? MiddleName { get; set; }

        public string? LastName { get; set; }

        public DateOnly? Dob { get; set; }

        public IFormFile Photo { get; set; }
    }
}
