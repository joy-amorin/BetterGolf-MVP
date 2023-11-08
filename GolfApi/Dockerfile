# Docker file for the GolfApi project

# Build the project
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS base
WORKDIR /app
EXPOSE 80

# Copy the project files and restore dependencies
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Copy all .csproj files to the container
COPY ["GolfApi/GolfApi.csproj", "GolfApi/"]

# Restore dependencies
RUN dotnet restore "GolfApi/GolfApi.csproj"

# Copy the rest of the application
COPY . .

# Set working directory for building
WORKDIR "/src/GolfApi"

# Build the project and its dependencies
RUN dotnet build "GolfApi.csproj" -c Release -o /app/build


FROM build AS publish
# Publish
RUN dotnet publish "GolfApi.csproj" -c Release -o /app/publish


FROM base AS final
WORKDIR /app
# Copy the published content
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GolfApi.dll"]
