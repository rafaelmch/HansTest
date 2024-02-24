#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["hansangularwebapi.client/nuget.config", "hansangularwebapi.client/"]
COPY ["HansAngularWebAPI.Server/HansAngularWebAPI.Server.csproj", "HansAngularWebAPI.Server/"]
COPY ["hansangularwebapi.client/hansangularwebapi.client.esproj", "hansangularwebapi.client/"]
RUN dotnet restore "./HansAngularWebAPI.Server/./HansAngularWebAPI.Server.csproj"
COPY . .
WORKDIR "/src/HansAngularWebAPI.Server"
RUN dotnet build "./HansAngularWebAPI.Server.csproj" -c %BUILD_CONFIGURATION% -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./HansAngularWebAPI.Server.csproj" -c %BUILD_CONFIGURATION% -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HansAngularWebAPI.Server.dll"]