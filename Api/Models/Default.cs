using Microsoft.EntityFrameworkCore;
using GolfApi.Data;
using Microsoft.AspNetCore.Mvc;

namespace GolfApi.Models
{
    public class Default
    {
        public int Id { get; set; }
        public string? Key { get; set; }
        public string? Value { get; set; }

        public static async Task<IResult> CreateDefault(BgContext context, Default defaultEntry)
        {
            context.Defaults.Add(defaultEntry);
            await context.SaveChangesAsync();
            return Results.Json(defaultEntry);
        }

        public static async Task<IResult> GetDefaultByKey(BgContext context, string key)
        {
            var defaultEntry = await context.Defaults.FirstOrDefaultAsync(d => d.Key == key);
            return Results.Json(defaultEntry);
        }
    }
}
