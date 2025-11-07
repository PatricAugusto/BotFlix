using System.ComponentModel.DataAnnotations;

namespace Botflix.Api.Models
{
    public class MoodRequest
    {
        [Required(ErrorMessage = "O campo Humor é obrigatório.")]
        public string Mood { get; set; }
    }
}