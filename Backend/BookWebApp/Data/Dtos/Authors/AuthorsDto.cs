using System.Reflection.Metadata;

namespace BookWebApp.Data.Dtos.Authors
{
    public class AuthorsDto
    {
        public record AuthorDto(int Id, string FirstName, string LastName, DateTime DateOfBirth, string AboutAuthor, string PictureBase64);
        public record CreateAuthorDto(string FirstName, string LastName, DateTime DateOfBirth, string AboutAuthor, string PictureBase64);
        public record UpdateAuthorDto(string AboutAuthor, string PictureBase64);
    }
}
