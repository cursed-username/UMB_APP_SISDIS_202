using Microsoft.EntityFrameworkCore;

namespace Reviews.Models
{
    public class ReviewsContext : DbContext
    {
        public DbSet<Review> Reviews { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder options) => options.UseSqlite("Data Source=reviews.db");
    }
}