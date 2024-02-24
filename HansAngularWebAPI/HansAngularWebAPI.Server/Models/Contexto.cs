// Rafael Hassegawa - 20/02/2024
// Context

using Microsoft.EntityFrameworkCore;

namespace HansAngularWebAPI.Server.Models
{
    public class Contexto : DbContext
    {
        public DbSet<Pessoa> Pessoas { get; set; }

#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public Contexto(DbContextOptions<Contexto> opcoes) : base(opcoes) 
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        { 

        }   

    }
}
