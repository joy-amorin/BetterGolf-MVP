namespace GolfApi.Models.DTOs.ScorecardDTOs;

public class ScorecardListGetDTO
{
    public int Id { get; set; }
    public int PlayingHandicap { get; set; }
    public int Player { get; set; }

    public ScorecardListGetDTO(Scorecard scorecard)
    {
        Id = scorecard.Id;
        PlayingHandicap = scorecard.PlayingHandicap;
        Player = scorecard.PlayerId;
    }
}