using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GolfApi.Migrations
{
    /// <inheritdoc />
    public partial class BG : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Scorecards_Players_PlayerId",
                table: "Scorecards");

            migrationBuilder.AlterColumn<int>(
                name: "PlayerId",
                table: "Scorecards",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NetScore",
                table: "Results",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Scorecards_Players_PlayerId",
                table: "Scorecards",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Scorecards_Players_PlayerId",
                table: "Scorecards");

            migrationBuilder.DropColumn(
                name: "NetScore",
                table: "Results");

            migrationBuilder.AlterColumn<int>(
                name: "PlayerId",
                table: "Scorecards",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Scorecards_Players_PlayerId",
                table: "Scorecards",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id");
        }
    }
}
