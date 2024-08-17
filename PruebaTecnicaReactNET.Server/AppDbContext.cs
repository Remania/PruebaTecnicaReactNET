using Microsoft.EntityFrameworkCore;
using PruebaTecnicaReactNET.Server.Models;

namespace PruebaTecnicaReactNET.Server
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> User { get; set; }
    }
}
