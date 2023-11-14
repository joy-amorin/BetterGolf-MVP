# Better Golf API

## Migrations
Execute the migrate.sh script:
  ```bash
  ./migrate.sh
  ```
  Or run on terminal:
  ```bash
  docker exec dotnet ef migrations add <migration_name>
  ```
  ```bash
  docker exec dotnet ef database update
  ```
