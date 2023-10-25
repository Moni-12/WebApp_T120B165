using BookWebApp.Auth.Model;
using System.ComponentModel.DataAnnotations;

namespace BookWebApp.Data.Entities
{
    public class Author
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string AboutAuthor { get; set; }
        public string? PictureBase64 { get; set; }
    }
}
