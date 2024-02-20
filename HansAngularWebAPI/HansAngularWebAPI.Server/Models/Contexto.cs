// Rafael Hassegawa - 20/02/2024
// Context

using Microsoft.EntityFrameworkCore;

namespace HansAngularWebAPI.Server.Models
{
    public class Contexto : DbContext
    {
        public DbSet<Pessoa> Pessoas { get; set; }

        public Contexto(DbContextOptions<Contexto> opcoes) : base(opcoes) 
        { 

        }   

    }
}
