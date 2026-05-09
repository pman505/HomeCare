using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Controllers;
using Server.DataContext;
using Server.Models;

namespace Server.Services;

public class ResidentService
{
    private ReactHomecareContext _context;

    public ResidentService(ReactHomecareContext context)
    {
        _context = context;
    }

    public Task<List<ResidentWeight>> WeightHistory(int id)
    {
        var history = _context.ResidentWeights.Where(x => x.ResidentId == id).OrderBy(x => x.DateTime).ToListAsync();
        return history;
    }
}