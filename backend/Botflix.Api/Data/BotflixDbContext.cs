using Microsoft.EntityFrameworkCore;
using Botflix.Api.Models;

namespace Botflix.Api.Data
{
    public class BotflixDbContext : DbContext
    {
        public BotflixDbContext(DbContextOptions<BotflixDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = default!;
    }
}