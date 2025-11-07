using Botflix.Api.Models;
using Botflix.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Botflix.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SuggestionController : ControllerBase
    {
        private readonly IGeminiService _geminiService;
        private readonly ILogger<SuggestionController> _logger;
        public SuggestionController(IGeminiService geminiService, ILogger<SuggestionController> logger)
        {
            _geminiService = geminiService;
            _logger = logger;
        }

        /// <summary>
        /// Gera uma sugestão de filme baseada no humor fornecido pelo usuário, usando a API Gemini.
        /// </summary>
        /// <param name="request">O texto que descreve o humor do usuário.</param>
        /// <returns>Um objeto JSON contendo o título, gênero e razão da sugestão.</returns>
        [HttpPost]
        public async Task<IActionResult> GetMovieSuggestion([FromBody] MoodRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _logger.LogInformation("Recebido pedido de sugestão para o humor: {Mood}", request.Mood);

                string geminiResponseJson = await _geminiService.SuggestMovieByMoodAsync(request.Mood);

                return Content(geminiResponseJson, "application/json");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao processar a sugestão do filme.");
                return StatusCode(500, new { Message = "Ocorreu um erro ao consultar o serviço de IA." });
            }
        }
    }
}