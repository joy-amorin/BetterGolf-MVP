FROM mcr.microsoft.com/dotnet/sdk:7.0 as development

WORKDIR /app

RUN dotnet tool install --global dotnet-ef

ENV PATH="$PATH:/root/.dotnet/tools"

EXPOSE 5001

CMD ["dotnet", "run"]
