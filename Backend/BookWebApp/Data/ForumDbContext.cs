using BookWebApp.Auth.Model;
using BookWebApp.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookWebApp.Data
{
    public class ForumDbContext : IdentityDbContext<ForumRestUser>
    {
        private readonly IConfiguration _configuration;
        public DbSet<Author> Authors { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Review> Reviews { get; set; }

        public ForumDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_configuration.GetValue<string>("PostgreSQLConnectionString"));
        }
    }
}
