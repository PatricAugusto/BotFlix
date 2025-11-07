namespace Botflix.Api.Services
{
    public interface IGeminiService
    {
        Task<string> SuggestMovieByMoodAsync(string mood);
    }
}