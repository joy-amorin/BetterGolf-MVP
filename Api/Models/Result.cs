using Api.Data;
using Microsoft.EntityFrameworkCore;
using Api.Models.DTOs.ScorecardResultDTOs;
using Api.Models.Engine;
using System.ComponentModel.DataAnnotations;

namespace Api.Models;

public class Result
{
    public int Id { get; set; }
    public Player Player { get; set; }
    public Tournament Tournament { get; set; }
    public int Score { get; set; }
    public string TournamentType { get; set; }
    public Result(Player player, Tournament tournament,  int score, string tournamentType)
    {
        Player = player;
        Tournament = tournament;
        Score = score;
        TournamentType = tournamentType;
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
    public static async Task<IResult> DeleteResult(int id, BgContext db)
    {
        var result = await db.Results.FindAsync(id);

        if (result == null) { return Results.NotFound(); }

        db.Results.Remove(result);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    public class TournamentRanking
    {
        [Key]
        public int Position { get; set; }
        public int TournamentId { get; set; }
        public int PlayerId { get; set; }
        public int TotalStrokes { get; set; }
    }
    public static async Task<IResult> GenerateTournamentRanking(BgContext db, int tournamentId)
    {
        var rankings = db.Scorecards.Where(scorecard => scorecard.TournamentId == tournamentId)
            .GroupBy(scorecard => scorecard.PlayerId)
            .Select(group => new Result.TournamentRanking
            {
                TournamentId = tournamentId,
                PlayerId = group.Key,
                TotalStrokes = group.Sum(scorecard => scorecard.TotalStrokes)
            })
            .OrderBy(ranking => ranking.TotalStrokes).ToList();

        db.TournamentRankings.AddRange(rankings);
        await db.SaveChangesAsync();

        return Results.Ok();
    }
}
