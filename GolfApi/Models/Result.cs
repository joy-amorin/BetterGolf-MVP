using GolfApi.Data;
using Microsoft.EntityFrameworkCore;
using GolfApi.Models.Engine;

namespace GolfApi.Models;

public class Result
{
    public int Id { get; set; }
    public Player Player { get; set; }
    public int Placement { get; set; }
    public Result(Player player, int placement)
    {
        Player = player;
        Placement = placement;
    }
    public Result() 
    {
        Player = new Player();
    }
    public override bool Equals(object? obj)
    {
        if (obj is Result result)
        {
            return Id == result.Id;
        }
        return false;
    }
    public override int GetHashCode()
    {
        return Id.GetHashCode();
    }
    public override string ToString()
    {
        return $"Id: {Id}, Placement: {Placement}";
    }
    public static async Task<IResult> GetAllResults(BgContext db)
    {
        return Results.Ok(await db.Results.ToArrayAsync());
    }
    public static async Task<IResult> GetResult(int id, BgContext db)
    {
        var result = await db.Results.FindAsync(id);

        if (result == null) { return Results.NotFound(); }

        return Results.Ok(result);
    }
    public static async Task<IResult> CreateResult(BgContext db, Result result)
    {
        db.Results.Add(result);
        await db.SaveChangesAsync();

        return Results.Created($"/Results/{result.Id}", result);
    }
    public static async Task<IResult> UpdateResult(int id, BgContext db, Result InputResult)
    {
        var result = await db.Results.FindAsync(id);

        if (result == null) { return Results.NotFound(); }

        result.Player = InputResult.Player;
        result.Placement = InputResult.Placement;

        await db.SaveChangesAsync();

        return Results.NoContent();
    }
    public static async Task<IResult> DeleteResult(int id, BgContext db)
    {
        var result = await db.Results.FindAsync(id);

        if (result == null) { return Results.NotFound(); }

        db.Results.Remove(result);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    public int CalculateScore(int playingHandicap, List<ScorecardResult> scorecardResults)
    {
        return ResultsEngine.Score(playingHandicap, scorecardResults);
    }
    public int CalculateStableford(List<ScorecardResult> scorecardResults)
    {
        return ResultsEngine.Stableford(scorecardResults);
    }
}
