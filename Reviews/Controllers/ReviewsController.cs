using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Reviews.Helpers;
using Reviews.Models;

namespace Reviews.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ReviewsController : ControllerBase
  {
    private readonly IWebHostEnvironment _hostEnvironment;
    private readonly ILogger<ReviewsController> _logger;

    public ReviewsController(IWebHostEnvironment hostEnvironment, ILogger<ReviewsController> logger)
    {
      _hostEnvironment = hostEnvironment;
      _logger = logger;
    }

    [HttpPost]
    public IActionResult Post(RatingDto rating)
    {
      try
      {
        if (!ModelState.IsValid)
          return BadRequest("Invalid data");

        var review = new Review{
          ProductId = rating.ProductId,
          Comment = rating.Review,
          UserId = rating.UserId
        };

        using (var context = new ReviewsContext())
        {
          context.Add(review);
          context.SaveChanges();
        }

        return Ok(review);
      }
      catch (Exception e)
      {
        _logger.LogError(e, "There was an error registering the review for the product");
        return BadRequest(e);
      }
    }

    [HttpPost("Image")]
    public async Task<IActionResult> PostImage(IFormFile image)
    {
      string uniqueFileName;

      if (image != null)
      {
        uniqueFileName = FileHelper.GetUniqueFileName(image.FileName);
        var uploads = Path.Combine(_hostEnvironment.ContentRootPath, "uploads");
        var filePath = Path.Combine(uploads, uniqueFileName);
        await image.CopyToAsync(new FileStream(filePath, FileMode.Create));
      }

      return Ok();
    }

    [HttpPost("Like")]
    public IActionResult Like()
    {
      return Ok("Like invocado");
    }

    [HttpGet("Product/{id}")]
    public ActionResult<IList<Review>> GetReviews([FromRoute] int id)
    {
      using (var context = new ReviewsContext())
      {
        return Ok(context.Reviews.Where(r => r.ProductId == id).ToList());
      }
      
    }
  }
}