FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Proje dosyasýný kopyala ve baðýmlýlýklarý yükle
COPY *.csproj ./
RUN dotnet restore

# Tüm dosyalarý kopyala ve yayýnla (publish)
COPY . ./
RUN dotnet publish -c Release -o out

# Çalýþma zamaný (Runtime) imajý
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/out .

# API'nin portu
EXPOSE 80
ENTRYPOINT ["dotnet", "SiparisApi.dll"]
