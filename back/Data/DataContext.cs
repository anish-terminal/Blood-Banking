using back.Entities;
using Microsoft.EntityFrameworkCore;

namespace back.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        
        public DbSet<AppUser> Users { get; set; }
    }
}