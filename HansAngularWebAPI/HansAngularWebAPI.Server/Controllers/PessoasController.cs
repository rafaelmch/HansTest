// Rafael Hassegawa - 20/02/2024
// Creating my Pessoa (person) controller

using HansAngularWebAPI.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HansAngularWebAPI.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PessoasController : ControllerBase
    {
        private readonly Contexto _contexto;

        public PessoasController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet] // return all rows
        public async Task<ActionResult<IEnumerable<Pessoa>>> PegarTodosAsync()
        {
            return await _contexto.Pessoas.ToListAsync();
        }

        [HttpGet("{pessoaId}")]
        public async Task<ActionResult<Pessoa>> PegarPessoaPelaIdAsync(int pessoaId)
        {
#pragma warning disable CS8600 // Conversão de literal nula ou possível valor nulo em tipo não anulável.
            Pessoa pessoa = await _contexto.Pessoas.FindAsync(pessoaId);
#pragma warning restore CS8600 // Conversão de literal nula ou possível valor nulo em tipo não anulável.

            if (pessoa == null)
            {
                return NotFound();
            }

            return Ok(pessoa);
        }

        [HttpPost] // save
        public async Task<ActionResult<Pessoa>> SalvarPessoaAsync(Pessoa pessoa)
        {
            await _contexto.Pessoas.AddAsync(pessoa);
            await _contexto.SaveChangesAsync();
            return Ok(pessoa);
        }

        [HttpPut] // update
        public async Task<ActionResult> AtualizarPessoaAsync(Pessoa pessoa)
        {
            _contexto.Pessoas.Update(pessoa);
            await _contexto.SaveChangesAsync();
            return Ok(pessoa);
        }

        [HttpDelete("{pessoaId}")] // delete
        public async Task<ActionResult> ExcluirPessoaAsync(int pessoaId)
        {
#pragma warning disable CS8600 // Conversão de literal nula ou possível valor nulo em tipo não anulável.
            Pessoa pessoa = await _contexto.Pessoas.FindAsync(pessoaId);
#pragma warning restore CS8600 // Conversão de literal nula ou possível valor nulo em tipo não anulável.
            if (pessoa == null)
            {
                return NotFound();
            }
            _contexto.Remove(pessoa);
            await _contexto.SaveChangesAsync();
            return Ok(pessoa);
        }
    }
}
