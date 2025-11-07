using Microsoft.AspNetCore.Authorization; 
using Microsoft.AspNetCore.Mvc;

namespace Botflix.Api.Controllers
{
    [Authorize] 
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {

        [HttpGet]
        public IActionResult GetSuggestedMovies()
        {
            var suggestedMovies = new List<object>
            {
                new { Id = 1, Title = "O Púlpito do Programador", Genre = "Aventura", SuggestionReason = "Seu humor sugere uma necessidade de drama e lógica complexa." },
                new { Id = 2, Title = "A Sintaxe Oculta", Genre = "Mistério", SuggestionReason = "Seu humor pede por enigmas e resoluções elegantes." },
                new { Id = 3, Title = "O Paradigma de M", Genre = "Ficção Científica", SuggestionReason = "Seu humor está voltado para o futuro e a inovação." }
            };

            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            var userEmail = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;

            return Ok(new 
            {
                UserId = userId,
                UserEmail = userEmail,
                Movies = suggestedMovies,
                Message = "Sugestões de filmes acessadas com sucesso por um usuário autenticado."
            });
        }
    }
}