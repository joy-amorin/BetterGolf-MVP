using GolfApi.Data;
using GolfApi.Models.DTOs.CategoryDTOs;
using GolfApi.Models.DTOs.PlayerDTOs;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace GolfApi.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Sex { get; set; } = "mixed";
    public Course? OpenCourse { get; set; }
    public Course? LadiesCourse { get; set; }
    public int MinAge { get; set; }
    public int MaxAge { get; set; }
    public double MinHcap { get; set; }
    public double MaxHcap { get; set; }
    public int NumberOfHoles { get; set; }
    public int Count { get; set; }
    public Tournament? Tournament { get; set; } = null!;
    public Category? ParentCategory { get; set; }
    public List<Category>? ChildrenCategories { get; set; }
    public List<Player>? Players { get; set; } = new List<Player>();

    public Category(string name, Course openCourse, Course ladiesCourse, List<Player> players, int numberOfHoles)
    {
        Name = name;
        OpenCourse = openCourse;
        LadiesCourse = ladiesCourse;
        Players = players;
        NumberOfHoles = numberOfHoles;
    }
    public Category(CategoryPostDTO categoryPostDTO)
    {
        Name = categoryPostDTO.Name;
        Sex = categoryPostDTO.Sex;
        MinAge = categoryPostDTO.MinAge;
        MaxAge = categoryPostDTO.MaxAge;
        MinHcap = categoryPostDTO.MinHcap;
        MaxHcap = categoryPostDTO.MaxHcap;
        NumberOfHoles = categoryPostDTO.NumberOfHoles;
    }
    public Category()
    {
    }

    public override bool Equals(object? obj)
    {
        if (obj is Category category)
        {
            return Id == category.Id;
        }
        return false;
    }
    public override int GetHashCode()
    {
        return Id.GetHashCode();
    }
    public override string ToString()
    {
        return $" Id: {Id}, Name: {Name}, Number of players: {Count}";
    }

    public static async Task<IResult> GetAllCategories(BgContext db)
    {
        return Results.Ok(await db.Categories.Select(x => new CategoryListGetDTO(x)).ToArrayAsync());
    }
    public static async Task<IResult> GetCategory(int id, BgContext db)
    {
        var category = await db.Categories.FindAsync(id);
        if (category == null) { return Results.NotFound(); }

        return Results.Ok(new SingleCategoryDTO(category));
    }
    public static async Task<IResult> CreateCategory(BgContext db, CategoryPostDTO categorydto)
    {
        var category = new Category(categorydto);
        db.Categories.Add(category);
        await db.SaveChangesAsync();

        return Results.Created($"/Categories/{category.Id}", new SingleCategoryDTO(category));
    }
    public static async Task<IResult> UpdateCategory(int id, BgContext db, CategoryPostDTO InputCategory)
    {
        var category = await db.Categories.FindAsync(id);

        if (category == null) { return Results.NotFound(); }

        category.Name = InputCategory.Name;
        category.MinAge = InputCategory.MinAge;
        category.MaxAge = InputCategory.MaxAge;
        category.MinHcap = InputCategory.MinHcap;
        category.MaxHcap = InputCategory.MaxHcap;
        category.NumberOfHoles = InputCategory.NumberOfHoles;

        await db.SaveChangesAsync();

        return Results.NoContent();
    }
    public static async Task<IResult> DeleteCategory(int id, BgContext db)
    {
        var category = await db.Categories.FindAsync(id);

        if (category == null) { return Results.NotFound(); }

        db.Categories.Remove(category);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    ///Function that return the players of a category
    public static async Task<IResult> GetCategoryPlayers(int Id, BgContext db)
    {
        var category = await db.Categories.Include(cat => cat.Players).FirstOrDefaultAsync(cat => cat.Id == Id);
        if (category == null) { return Results.NotFound(); }

        var dtosList = new List<PlayerListGetDTO>();
        if (category.Players == null) { return Results.Empty; };

        foreach (var p in category.Players)
        {
            dtosList.Add(new PlayerListGetDTO(p));
        }
        return Results.Ok(dtosList);
    }
    public static async Task<IResult> AddCategoryPlayer(int Id, int playerid, BgContext db)
    {
        var category = await db.Categories.FindAsync(Id);
        if (category == null) { return Results.NotFound(); };

        var player = await db.Players.FindAsync(playerid);
        if (player == null) { return Results.NotFound(); };

        if (category.Players != null && !category.Players.Any(p => p.Id == playerid))
        {
            category.Players.Add(player);
            category.Count = category.Players.Count;
            Course defaultCourse = Course.GetDefaultCourse(db);
            await db.SaveChangesAsync();
            return Results.Ok(new PlayerListGetDTO(player));
        }
        return Results.Text("Player already in tournament");
    }
    // Function that delete player of a cetegory
    public static async Task<IResult> DeleteCategoryPlayer(int Id, int playerid, BgContext db)
    {
        var category = await db.Categories.Include(x => x.Players).FirstOrDefaultAsync(x => x.Id == Id);
        if (category == null) { return Results.NotFound(); }

        if (category.Players == null) { return Results.NotFound(); };

        var playerInCategory = category.Players.FirstOrDefault(p => p.Id == playerid);
        if (playerInCategory != null)
        {
            category.Players.Remove(playerInCategory);
            category.Count = category.Players.Count;
            await db.SaveChangesAsync();
            return Results.Ok("Jugador eliminado de la categoria");
        }
        return Results.Text("El jugador no se encontro en la categoria");
    }
    public static async Task<IResult> SetOpenCourse(int Id, int CourseId, BgContext db)
    {
        var category = await db.Categories.FindAsync(Id);
        if (category == null) { return Results.NotFound(); };

        var course = await db.Courses.FindAsync(CourseId);
        if (course == null) { return Results.NotFound(); }

        category.OpenCourse = course;
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    public static async Task<IResult> SetLadiesCourse(int Id, int CourseId, BgContext db)
    {
        var category = await db.Categories.FindAsync(Id);
        if (category == null) { return Results.NotFound(); };

        var course = await db.Courses.FindAsync(CourseId);
        if (course == null) { return Results.NotFound(); }

        category.LadiesCourse = course;
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    public static Category GetDefaultCategory(Tournament tournament, BgContext db)
    {
        Course defaultCourse = Course.GetDefaultCourse(db); // obtener el curso por defecto utilizando el metodo definido en Course
        return
            new Category()
            {
                Name = "Mixed General Category Hcap cutoff @56",
                Sex = "mixed",
                OpenCourse = defaultCourse,
                LadiesCourse = null,
                Tournament = tournament,
                MinAge = 0,
                MaxAge = 130,
                MinHcap = -15,
                MaxHcap = 56,
            };
    }
    public static async Task<IResult> UpdateSeperateLadies(int Id, BgContext db)
    {
        var category = await db.Categories.Include(x => x.ChildrenCategories).Include(x => x.Tournament).FirstOrDefaultAsync(x => x.Id == Id);
        if (category == null) { return Results.NotFound(); };
        
        if (!(category.MinAge == 0) && !(category.MaxAge == 130) )
        {
            return Results.BadRequest("Esta categoria ya ha sido separada en edades y por lo tanto no puede ser separada en sexo");
        }
        if (!(category.MinHcap == -15) || !(category.MaxHcap == 56))
        {
            return Results.BadRequest("Esta categoria ya ha sido separade en handicap y por lo tanto no puede ser separada por sexo o edad");
        }
        var catArray = new Category[2];
        catArray[0] = new Category() {
            Name = "Ladies General category Hcap cutoff @56",
            Sex = "ladies",
            OpenCourse = category.OpenCourse,
            LadiesCourse = category.LadiesCourse,
            MinAge = category.MinAge,
            MaxAge = category.MaxAge,
            Tournament = category.Tournament,
            MinHcap = category.MinHcap,
            MaxHcap = category.MaxHcap,
            NumberOfHoles = category.NumberOfHoles,
            ParentCategory = category,
            };
        catArray[1] = new Category() {
            Name = "Open General category Hcap cutoff @56",
            Sex = "Open",
            OpenCourse = category.OpenCourse,
            LadiesCourse = category.LadiesCourse,
            MinAge = category.MinAge,
            MaxAge = category.MaxAge,
            Tournament = category.Tournament,
            MinHcap = category.MinHcap,
            MaxHcap = category.MaxHcap,
            NumberOfHoles = category.NumberOfHoles,
            ParentCategory = category,
        };
        category.Tournament?.Categories.Add(catArray[0]);
        category.Tournament?.Categories.Add(catArray[1]);
        category.ChildrenCategories = new List<Category>();
        category.ChildrenCategories.AddRange(catArray);
        await db.SaveChangesAsync();
        var list = new List<SingleCategoryDTO>();
        foreach (var element in catArray)
        {
            list.Add(new SingleCategoryDTO(element));
        }
        db.Remove(category);
        await db.SaveChangesAsync();
        return Results.Ok(list.ToArray());
    }
    public static async Task<IResult> UpdateSeparateAgeCategories(int Id, int[] array, BgContext db)
    {
        var category = await db.Categories.Include(x => x.Tournament).Include(x => x.ChildrenCategories).FirstOrDefaultAsync(x => x.Id == Id);
        if (category == null) { return Results.NotFound(); };

        if (!(category.MinHcap == -15) || !(category.MaxHcap == 56))
        {
            return Results.BadRequest("Esta categoria ya ha sido separade en handicap y por lo tanto no puede ser separada por sexo o edad");
        }
        if ((array.Min() < 1) || array.Max() > 129)
        {
            return Results.BadRequest("Categorias de edad mal dise�adas");
        }
        if (array.Length < 2)
            return Results.BadRequest("Las categorias no se arman impllicitamente. Se necesitan almenos 2 elementos para armarlas");
        Array.Sort(array);
        var categoryArray = new Category[array.Length + 1];
        int i = 0;
        foreach (int element in array)
        {
            if (i == 0)
            {
            }
            else
            {
                categoryArray[i] = new Category()
                {
                    Name = $"{category.Sex} de {(i > 1 ? array[i - 1] + 1 : array[i - 1])} hasta {array[i]} Hcap cutoff @56",
                    Sex = category.Sex,
                    OpenCourse = category.OpenCourse,
                    LadiesCourse = category.LadiesCourse,
                    MinAge = array[i - 1],
                    Tournament = category.Tournament,
                    MinHcap = category.MinHcap,
                    MaxHcap = category.MaxHcap,
                    MaxAge = array[i],
                    NumberOfHoles = category.NumberOfHoles
                };
            }
            i++;
        }
        Category GeneralCategory = new() {
            Name = $"{category.Sex} General Category Hcap cutoff @56",
            Sex = category.Sex,
            LadiesCourse = category.LadiesCourse,
            OpenCourse = category.OpenCourse,
            MinAge = 0,
            Tournament = category.Tournament,
            MaxAge = 130,
            MinHcap = -15,
            MaxHcap = 56,
            NumberOfHoles = category.NumberOfHoles
        };
        category.ChildrenCategories ??= new List<Category>();
        category.ChildrenCategories.Add(GeneralCategory);
        await db.SaveChangesAsync();
        category.Tournament?.Categories.Add(GeneralCategory);
        var list = new List<SingleCategoryDTO>
        {
            new SingleCategoryDTO(GeneralCategory)
        };
        foreach (var element in categoryArray.ToList())
        {
            if (element != null)
            {
                category.Tournament?.Categories.Add(element);
                category.ChildrenCategories.Add(element);
                await db.SaveChangesAsync();
                list.Add(new SingleCategoryDTO(element));
            }
        }
        db.Remove(category);
        await db.SaveChangesAsync();
        return Results.Ok(list.ToArray());
    }
    public static async Task<IResult> UpdateSeparateHcapCategories(int Id, double[] array, BgContext db)
    {
        var category = await db.Categories.Include(x => x.Tournament).Include(x => x.ChildrenCategories).FirstOrDefaultAsync(x => x.Id == Id);
        if (category == null) { return Results.NotFound(); };

        if (array.Min() < -15 || array.Max() > 56)
        {
            return Results.BadRequest("Las categorias deseadas estan fueras del rango posible");
        }
        Array.Sort(array);
        var categoryArray = new Category[array.Length + 1];
        int i = 0;
        foreach (double element in array) // esto se tiene que cambiar obviamente, pero despues jeje
        {
            if (i == 0)
            {
                categoryArray[0] = new Category()
                {
                    Name = category.MinAge == 0 && category.MaxAge == 130 ? $"{category.Sex} general category Hcap Cutoff@{array[0]}" : $"{category.Sex} de {category.MinAge} hasta {category.MaxAge} Hcap cutoff @{array[0]}",
                    Sex = category.Sex,
                    OpenCourse = category.OpenCourse,
                    LadiesCourse = category.LadiesCourse,
                    MinAge = category.MinAge,
                    Tournament = category.Tournament,
                    MaxAge = category.MaxAge,
                    MinHcap = -15,
                    MaxHcap = array[0],
                    NumberOfHoles = category.NumberOfHoles
                };
            }
            else
            {
            categoryArray[i] = new Category()
            {
                    Name = category.MinAge == 0 && category.MaxAge == 130 ? $"{category.Sex} general category Hcap Cutoff@{array[i]}" : $"{category.Sex} de {category.MinAge} hasta {category.MaxAge} Hcap cutoff @{array[i]}",
                    Sex = category.Sex,
                    OpenCourse = category.OpenCourse,
                    LadiesCourse = category.LadiesCourse,
                    MinAge = category.MinAge,
                    MaxAge = category.MaxAge,
                    Tournament = category.Tournament,
                    MinHcap = array[i - 1],
                    MaxHcap = array[i],
                    NumberOfHoles = category.NumberOfHoles
                };
            }
            i++;
        }
        category.ChildrenCategories ??= new List<Category>();
        var list = new List<SingleCategoryDTO>();
        var lastCategory = new Category()
        {
            Name = category.MinAge == 0 && category.MaxAge == 130 ? $"{category.Sex} general category Hcap Cutoff@56" : $"{category.Sex} de {category.MinAge} hasta {category.MaxAge} Hcap cutoff @56",
            Sex = category.Sex,
            OpenCourse = category.OpenCourse,
            LadiesCourse = category.LadiesCourse,
            Tournament = category.Tournament,
            MinAge = category.MinAge,
            MaxAge = category.MaxAge,
            MinHcap = array[i - 1],
            MaxHcap = 56,
            NumberOfHoles = category.NumberOfHoles
        };
        foreach (var element in categoryArray.ToList())
        {
            if (element != null)
            {
                category.Tournament?.Categories.Add(element);
                category.ChildrenCategories.Add(element);
                await db.SaveChangesAsync();
                list.Add(new SingleCategoryDTO(element));
            }
        }
        db.Remove(category);
        await db.SaveChangesAsync();
        list.Add(new SingleCategoryDTO(lastCategory));
        return Results.Ok(list.ToArray());
    }
}