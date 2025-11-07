using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Text; 
using System.Text.Json;
using System.Threading.Tasks;
using System;
using System.Net.Http; 

namespace Botflix.Api.Services
{
    public class GeminiService : IGeminiService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<GeminiService> _logger;
        private readonly string _apiKey;

        public GeminiService(IConfiguration configuration, ILogger<GeminiService> logger)
        {
            _configuration = configuration;
            _logger = logger;
            
            _apiKey = _configuration["Gemini:ApiKey"] 
                      ?? throw new InvalidOperationException("Gemini API Key não configurada em appsettings.");
        }

        public async Task<string> SuggestMovieByMoodAsync(string mood)
        {

            var httpClient = new HttpClient();
            
            string url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={_apiKey}";
            
            string prompt = $$""" 
            Você é um especialista em filmes e um assistente de IA focado em humor.
            Analise o humor fornecido pelo usuário: "{{mood}}".
            Com base nisso, sugira um único filme que combine perfeitamente com o estado emocional atual do usuário.
            
            Sua resposta DEVE ser um objeto JSON no seguinte formato:
            {
              "title": "Título do Filme Sugerido",
              "genre": "Gênero Principal",
              "reason": "Uma explicação concisa (máximo 15 palavras) de por que este filme se encaixa no humor."
            }
            """;

            var requestBody = new 
            {
                contents = new[]
                {
                    new { parts = new[] { new { text = prompt } } }
                }
            };

            var content = new StringContent(
                JsonSerializer.Serialize(requestBody),
                Encoding.UTF8, 
                "application/json" 
            );

            var response = await httpClient.PostAsync(url, content);
            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();

            try
            {
                using var doc = JsonDocument.Parse(responseString);
                var candidate = doc.RootElement.GetProperty("candidates")[0];
                var part = candidate.GetProperty("content").GetProperty("parts")[0];
                
                return part.GetProperty("text").GetString() ?? "{}";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Falha ao analisar a resposta do Gemini: {Response}", responseString);
                return @"{""title"": ""Erro de IA"", ""genre"": ""Tente Novamente"", ""reason"": ""Falha ao processar sugestão."" }";
            }
        }
    }
}