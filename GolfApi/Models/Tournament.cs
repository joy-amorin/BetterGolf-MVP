using GolfApi.Data;
using Microsoft.EntityFrameworkCore;
using GolfApi.Models.DTOs.TournamentDTOs;
using GolfApi.Models.DTOs.PlayerDTOs;
using GolfApi.Models.DTOs.CategoryDTOs;
using GolfApi.Models.DTOs.ScorecardDTOs;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Http.HttpResults;
using GolfApi.Models.Engine;
using System.Diagnostics.Eventing.Reader;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Collections.Generic;


namespace GolfApi.Models;

public class Tournament
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string TournamentType { get; set; } = null!;
    public int Count { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public RoundInfo? RoundInfo { get; set; } = new RoundInfo();
    public ICollection<Player> Players { get; set; } = new List<Player>();
    public ICollection<Category> Categories { get; set; } = new List<Category>();
    public ICollection<Scorecard> Scorecards { get; set; } = new List<Scorecard>();

    public Tournament(TournamentPostDTO tournamentPostDTO)
    {
        Name = tournamentPostDTO.Name;
        TournamentType = tournamentPostDTO.TournamentType;
        StartDate = tournamentPostDTO.StartDate;
        EndDate = tournamentPostDTO.EndDate;
        Description = tournamentPostDTO.Description;
        RoundInfo = tournamentPostDTO.RoundInfo;
    }

    public Tournament() 
    {
    }
    public override bool Equals(object? obj)
    {
        if (obj is Tournament tournament)
        {
            return this.Id == tournament.Id;
        }
        return false;
    }
    public override int GetHashCode()
    {
        return Id.GetHashCode();
    }
    public override string ToString()
    {
        return $"ID Tournament: {Id}, Name: {Name}. Type: {TournamentType}";
    }
    public static async Task<IResult> GetAllTournaments(BgContext db)
    {
        return Results.Ok(await db.Tournaments.Select(x => new TournamentListGetDTO(x)).ToArrayAsync());
    }
    public static async Task<IResult> GetTournament(int id, BgContext db)
    {
        var tournament = await db.Tournaments.FindAsync(id);
        if (tournament == null) { return Results.NotFound(); }
        
        return Results.Ok(new SingleTournamentDTO(tournament));
    }
    public static async Task<IResult> CreateTournament(BgContext db, TournamentPostDTO tournamentdto)// falta agregar la course por defecto
    {
        var tournament = new Tournament(tournamentdto);
        Category category = Category.GetDefaultCategory(tournament, db);
        category.Tournament = tournament;
        tournament.Categories.Add(category);
        db.Tournaments.Add(tournament);
        await db.SaveChangesAsync();
        
        return Results.Created($"/Tournaments/{tournament.Id}", new SingleTournamentDTO(tournament));
    }
    public static async Task<IResult> UpdateTournament(int id, BgContext db, TournamentPostDTO newTournamentDTO)
    {
        var tournament = await db.Tournaments.FindAsync(id);
        if (tournament == null) { return Results.NotFound(); }

        tournament.Name = newTournamentDTO.Name;
        tournament.Description = newTournamentDTO.Description;
        tournament.TournamentType = newTournamentDTO.TournamentType;
        tournament.StartDate = newTournamentDTO.StartDate;
        tournament.EndDate = newTournamentDTO.EndDate;
        tournament.RoundInfo = newTournamentDTO.RoundInfo;

        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    public static async Task<IResult> DeleteTournament(int id, BgContext db)
    {
        var tournament = await db.Tournaments.FindAsync(id);
        if (tournament == null) { return Results.NotFound(); }
 
        db.Tournaments.Remove(tournament);

        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    ///Funcion que agrega una categoria a un torneo
    public static async Task<IResult> AddTournamentCategory(int tournamentId, int categoryId, BgContext db)
    {
        var tournament = await db.Tournaments.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == tournamentId);
        if (tournament == null) return Results.NotFound();

        var category = await db.Categories.FindAsync(categoryId);
        if (category == null) return Results.NotFound();

        if (!tournament.Categories.Any(c => c.Id == categoryId))
        {
            tournament.Categories.Add(category);
            await db.SaveChangesAsync();
            return Results.Ok(new SingleCategoryDTO(category));
        }
        return Results.NoContent();
    }
    ///Function que elimina una categoria de un toreno
    public static async Task<IResult> DeleteTournamentCategory(int tournamentId, int categoryId, BgContext db)
    {
        var tournament = await db.Tournaments.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == tournamentId);
        if (tournament == null) return Results.NotFound();

        var categoryOfTournament = tournament.Categories.FirstOrDefault(c => c.Id == categoryId);
        if (categoryOfTournament != null)
        {
            tournament.Categories.Remove(categoryOfTournament);
            await db.SaveChangesAsync();
            return Results.Ok(new SingleCategoryDTO(categoryOfTournament));
        }
        return Results.NoContent();
    }
    ///Function that return the category of a tournament
    public static async Task<IResult> GetTournamentCategories(int Id, BgContext db)
    {
        var tournament = await db.Tournaments.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == Id);
        if (tournament == null) { return Results.NotFound(); }

        var dtosList = new List<CategoryListGetDTO>();
        foreach (var c in tournament.Categories)
        {
            dtosList.Add(new CategoryListGetDTO(c));
        }
        return Results.Ok(dtosList);
    }
    ///function that return the players of a tournament
    public static async Task<IResult> GetTournamentPlayers(int Id, BgContext db)
    {
        var tournament = await db.Tournaments.Include(t => t.Players).FirstOrDefaultAsync(t => t.Id == Id);
        if (tournament == null) { return Results.NotFound(); }

        var dtosList = new List<PlayerListGetDTO>();
        foreach (var p in tournament.Players)
        {
            dtosList.Add(new PlayerListGetDTO(p));
        }
        return Results.Ok(dtosList);
    }
    // funcion que retorna los torneos activos, osea que su fecha de finalizacion es en el futuro y su fecha de inicio en el pasado
    public static async Task<IResult> GetActiveTournaments(BgContext db)
    {
        var tournaments = await db.Tournaments.Where(x => x.StartDate < DateOnly.FromDateTime(DateTime.Now) && x.EndDate > DateOnly.FromDateTime(DateTime.Now)).ToArrayAsync();
        if (tournaments == null) { return Results.NotFound(); }
        
        return Results.Ok(tournaments);
    }
    // funcion que retorne torneos completados, osea que la end date sea antes que hoy
    public static async Task<IResult> GetCompletedTournaments(BgContext db)
    {
        var tournaments = await db.Tournaments.Where(x => x.EndDate < DateOnly.FromDateTime(DateTime.Now)).ToArrayAsync();
        if (tournaments == null) { return Results.NotFound(); }

        return Results.Ok(tournaments);
    }
    //funcion que retorna las scorecards de un torneo
    public static async Task<IResult> GetTournamentScorecards(int Id, BgContext db)
    {
        var tournament = await db.Tournaments.Include(x => x.Scorecards).FirstOrDefaultAsync(x => x.Id == Id);
        if (tournament == null) { return Results.NotFound(); }

        var scorecardDtos = tournament.Scorecards.Select(sc => new ScorecardListGetDTO(sc)).ToList();

        return Results.Ok(scorecardDtos);
    }
    //funcion que agrega un jugador a un torneo si el jugador no esta ya registrado
        public static async Task<IResult> AddTournamentPlayer(int tournamentId, int playerId, BgContext db)
    {
        var tournament = await db.Tournaments.Include(x => x.Players).Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == tournamentId);
        if (tournament == null) return Results.NotFound();

        var player = await db.Players.FindAsync(playerId);
        if (player == null) return Results.NotFound();

        if (!tournament.Players.Any(p => p.Id == playerId))
        {
            tournament.Players.Add(player);
            tournament.Count = tournament.Players.Count;
            player.AssignCategory(tournament);
            Course defaultCourse = Course.GetDefaultCourse(db);// arreglar esto
            await db.SaveChangesAsync();
             foreach (Category category in tournament.Categories)
            {
                player.AssignScorecard(category, defaultCourse, db);
            }
            await db.SaveChangesAsync();
            return Results.Ok(new SinglePLayerDTO(player));
        }
        return Results.NoContent();
    }


    //funcion que elimine un jugador de un torneo
    public static async Task<IResult> DeleteTournamentPlayer(int tournamentId, int playerId, BgContext db)
    {
        var tournament = await db.Tournaments.Include(x => x.Players).FirstOrDefaultAsync(x => x.Id == tournamentId);
        if (tournament == null) return Results.NotFound();

        var playerInTournament = tournament.Players.FirstOrDefault(p => p.Id == playerId);
        if (playerInTournament != null)
        {
           tournament.Players.Remove(playerInTournament);
           tournament.Count = tournament.Players.Count;
           await db.SaveChangesAsync();
           return Results.Ok(new SinglePLayerDTO(playerInTournament)); 
        }
        return Results.NoContent();
    }
    
}

   /* public async Task<IResult> AssignCategoriesReset(int Id, BgContext db)
    {
        var tournament = await db.Tournaments.Include(x =>  x.Categories).Include(x => x.Players).FirstOrDefaultAsync(x => x.Id == Id);
        if (tournament == null) { return Results.NotFound(); };

        foreach (Player p in tournament.Players)
        {
            p.AssignCategory(tournament);
        }
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
     public static async Task<IResult> TournamentResults(int Id, bool DiscountHandicap, BgContext db)
    {
        var tournament = await db.Tournaments
            .Include(x => x.TournamentType)
            .Include(x => x.Scorecards)
                .ThenInclude(y => y.ScorecardResults)       
            .Include(x=> x.Scorecards)
                .ThenInclude(x => x.Player)
            .Include(x=> x.Scorecards)
                .ThenInclude(x=>x.PlayingHandicap)
            .Include(x => x.Categories)
            .FirstOrDefaultAsync(x => x.Id == Id);
        if (tournament == null) { return Results.NotFound(); };


        List<Result> results = new();
        int placement = 1;
        if (tournament.TournamentType.ToLower() == "medal")
        {
            if (DiscountHandicap)
            {
                foreach (Scorecard scorecard in tournament.Scorecards)
                {
                    results.Add(new Result(scorecard.Player, ResultsEngine.MedalNetScore(scorecard.ScorecardResults)));
                }
            }
            else
            {
                foreach (Scorecard scorecard in tournament.Scorecards)
                {
                    results.Add(new Result(scorecard.Player, ResultsEngine.MedalScratchScore(scorecard.PlayingHandicap, scorecard.ScorecardResults)));
                }
            }   
        }
        if (tournament.TournamentType.ToLower() == "stableford")
        {
            if (DiscountHandicap)
            {
                foreach (Scorecard scorecard in tournament.Scorecards)
                {
                    results.Add(new Result(scorecard.Player, ResultsEngine.StablefordScore(scorecard.ScorecardResults)));
                }
            }
            else
            {
                foreach (Scorecard scorecard in tournament.Scorecards)
                {
                    results.Add(new Result(scorecard.Player, ResultsEngine.StablefordScore(scorecard.AdjustScorecardResultsByHandicap())));
                }
            }
        }
        foreach (Result result in results.OrderBy(x => x.Score))
        {
            result.Placement = placement++;
        }
        return Results.Ok(results.ToArray());
    } */

