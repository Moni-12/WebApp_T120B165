using BookWebApp.Auth.Model;
using BookWebApp.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookWebApp.Data
{
    public class ForumDbContext : IdentityDbContext<ForumRestUser>
    {
        public DbSet<Author> Authors { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Review> Reviews { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(connectionString: "Data Source=LAPTOP-R6U0KL49\\SQLEXPRESS; Initial Catalog=BookAppDb;Trusted_Connection=True;TrustServerCertificate=True;");
        }
    }
}
