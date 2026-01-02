using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using SiparisApi.Models;

namespace SiparisApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Order> Orders => Set<Order>();
}

public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
        
        // Þifreyi kodun içine yazmýyoruz, sistemden çekiyoruz.
        // Eðer sistemde yoksa güvenli bir yer tutucu (placeholder) kullanýyoruz.
        var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING") 
                               ?? "Host=localhost;Database=SiparisDb;Username=postgres;Password=YOUR_SECURE_PASSWORD";

        optionsBuilder.UseNpgsql(connectionString);
        return new AppDbContext(optionsBuilder.Options);
    }
}
