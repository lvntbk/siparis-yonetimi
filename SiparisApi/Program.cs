using Microsoft.EntityFrameworkCore;
using SiparisApi.Data;

var builder = WebApplication.CreateBuilder(args);

// API için gerekli servisler
builder.Services.AddControllers();

// Veritabanı servisi
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Frontend ile konuşabilmek için CORS
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", b => b.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

// Middleware ayarları
app.UseCors("AllowAll");
app.MapControllers();

app.Run();