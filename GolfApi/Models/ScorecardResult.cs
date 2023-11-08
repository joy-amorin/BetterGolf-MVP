using GolfApi.Data;
using GolfApi.Models.DTOs.ScorecardResultDTOs;
using Microsoft.EntityFrameworkCore;
using GolfApi.Models;


namespace GolfApi.Models;

public class ScorecardResult
{
    public int Id { get; set; }
    public int Strokes { get; set; }
    public int RoundNumber { get; set; }
    public Hole Hole { get; set; } = null!;
    public ScorecardResult(int strokes, int roundNumber, Hole hole)
    {
        Strokes = strokes;
        RoundNumber = roundNumber;
        Hole = hole;

    }
    public ScorecardResult(ScorecardResultPostDTO scorecardResultPostDTO)
    {
        Strokes = scorecardResultPostDTO.Strokes;
    }
    public ScorecardResult()
    {
    }
    public override bool Equals(object? obj)
    {
        if (obj is ScorecardResult scorecardResult)
        {
            return Id == scorecardResult.Id;
        }
        return false;
    }
    public override int GetHashCode() { return Id.GetHashCode(); }
    public override string ToString()
    {
        return $"Id: {Id}, Strokes: {Strokes}, Round Number: {RoundNumber}";
    }

    public static async Task<IResult> GetScorecardResult(int id, BgContext db)
    {
        var scorecardresult = await db.ScorecardResults.Include(x => x.Hole).FirstOrDefaultAsync(x => x.Id == id);
        if (scorecardresult == null)
        {
            return Results.NotFound();
        }

        return Results.Ok(new SingleScorecardResultDTO(scorecardresult));
    }

    public static async Task<IResult> UpdateScorecardResult(int id, BgContext db, ScorecardResultPostDTO InputScorecardResult)
    {
        var scorecardresult = await db.ScorecardResults.Include(x => x.Hole).FirstOrDefaultAsync(x => x.Id == id);
        if (scorecardresult == null)
        {
            return Results.NotFound();
        }

        scorecardresult.Strokes = InputScorecardResult.Strokes;

        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    public static async Task<IResult> DeleteScorecardResult(
        int id, BgContext db)
    {
        var scorecardresult = await db.ScorecardResults.FindAsync(id);
        if (scorecardresult == null)
        {
            return Results.NotFound();
        }

        db.ScorecardResults.Remove(scorecardresult);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
}

