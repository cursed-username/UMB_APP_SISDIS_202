using System.ComponentModel.DataAnnotations;

namespace Reviews.Models
{
  public class RatingDto
  {
    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Id must be higher than 0")]
    public int ProductId { get; set; }

    [Required]
    [Range(0, 5, ErrorMessage = "The rating must be between 0 and 5")]
    public int? Rating { get; set; }

    [MaxLength(140)]
    public string Review { get; set; }

    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Id must be higher than 0")]
    public int UserId { get; set; }
  }
}