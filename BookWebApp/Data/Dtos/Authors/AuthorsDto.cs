namespace BookWebApp.Data.Dtos.Authors
{
    public class AuthorsDto
    {
        public record AuthorDto(int Id, string FirstName, string LastName, DateTime DateOfBirth, string AboutAuthor);
        public record CreateAuthorDto(string FirstName, string LastName, DateTime DateOfBirth, string AboutAuthor);
        public record UpdateAuthorDto(string AboutAuthor);
    }
}
