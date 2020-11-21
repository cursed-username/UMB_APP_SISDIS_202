using System;
using System.IO;

namespace Reviews.Helpers
{
  public static class FileHelper
  {
    public static string GetUniqueFileName(string fileName)
    {
      fileName = Path.GetFileName(fileName);
      return $"{Guid.NewGuid().ToString().Replace("-", string.Empty)}{Path.GetExtension(fileName)}";
    }
  }
}