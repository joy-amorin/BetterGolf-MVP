using GolfApi.Data;
using Microsoft.EntityFrameworkCore;
using GolfApi.Models.DTOs.ScorecardDTOs;
using System.Reflection.Metadata.Ecma335;

namespace GolfApi.Models;

public class Scorecard
{
    public int Id { get; set; }
    public int PlayingHandicap { get; set; }
    public List<ScorecardResult> ScorecardResults { get; set; } = new List<ScorecardResult>();
    public Player Player { get; set; }
    public int PlayerId { get; set; }
    public Tournament Tournament { get; set; }
    public int? TournamentId { get; set; }


    public Scorecard()
    {
    }
    public Scorecard(Player player)
    {
        Player = player;
    }
    public override string ToString() 
    {
        return $"Id: {Id}, PlayingHandicap: {PlayingHandicap}";
    }
    public override bool Equals(object? obj)
    {
        if (obj is Scorecard scorecard)
            return scorecard.Id == Id ;
        return false;
    }
    public override int GetHashCode()
    {
        return Id.GetHashCode();
    }
    public static async Task<IResult> GetScorecard(int id, BgContext db)
    {
        var scorecard = await db.Scorecards.FindAsync(id);

        if (scorecard == null) { return Results.NotFound(); }

        return Results.Ok(scorecard);
    }

    public static async Task<IResult> CreateScorecard(BgContext db, Scorecard scorecard)
    {
        db.Scorecards.Add(scorecard);
        await db.SaveChangesAsync();

        return Results.Created($"/Scorecards/{scorecard.Id}", scorecard);
    }
    public static async Task<IResult> UpdateScorecard(int id, BgContext db, Scorecard InputScorecard)
    {
        var scorecard = await db.Scorecards.FindAsync(id);

        if (scorecard == null) { return Results.NotFound(); }

        scorecard.PlayingHandicap = InputScorecard.PlayingHandicap;
        scorecard.ScorecardResults = InputScorecard.ScorecardResults;

        await db.SaveChangesAsync();

        return Results.NoContent();
    }
    
    public static async Task<IResult> DeleteScorecard(int id, BgContext db)
    {
        var scorecard = await db.Scorecards.FindAsync(id);

        if (scorecard == null) { return Results.NotFound(); }

        db.Scorecards.Remove(scorecard);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    ///Function that return the scorecard-results of a scorecard
    public static async Task<IResult> SResultInScorecard(int Id, BgContext db)
    {
        var scorecard = await db.Scorecards.Include(s => s.ScorecardResults).FirstOrDefaultAsync(x => x.Id == Id);
        if (scorecard == null) { return Results.NotFound(); }

        return Results.Ok(scorecard.ScorecardResults);
    }
    //Return the sum of a player´s stroke on a scorecard
    public int CalculateGrossScore()
    {
        int totalStrokes = 0;
        foreach (var result in ScorecardResults)
        {
            totalStrokes += result.Strokes;
        }
        return totalStrokes >= 0? totalStrokes : 0;
    }
    public int CalculateNetscore()
    {
        int grossScore = CalculateGrossScore();
        return (grossScore - PlayingHandicap);
    }
    public static async Task<IResult> AddScorecardResult(int Id, ScorecardResult ScorecardResult, BgContext db)
    {
        var scorecard = await db.Scorecards.FindAsync(Id);
        if (scorecard == null) { return Results.NotFound(); };

        scorecard.ScorecardResults.Add(ScorecardResult);
        await db.SaveChangesAsync();
        return Results.Ok(ScorecardResult);
    }
     public List<ScorecardResult> AdjustScorecardResultsByHandicap()
    {
        List<ScorecardResult> AdjustedScorecard = new();
        AdjustedScorecard = ScorecardResults.OrderBy(scorecardResult => scorecardResult.Hole.StrokeIndex).ToList();

        foreach (var scorecardResultOrdered in AdjustedScorecard)
        {
            if (PlayingHandicap > 0)
            {
                PlayingHandicap--;
                scorecardResultOrdered.Strokes--;
            }
            else
            {
                break;
            }
        }
        return AdjustedScorecard;
    }
}
