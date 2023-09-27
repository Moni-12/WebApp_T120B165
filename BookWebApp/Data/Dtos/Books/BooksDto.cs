using BookWebApp.Data.Entities;

namespace BookWebApp.Data.Dtos.Books
{
    public class BooksDto
    {
        public record BookDto(int Id, string Title, string Description, DateTime ReleaseDate, string Genre, Author Author);
        public record CreateBookDto(string Title, string Description, DateTime ReleaseDate, string Genre);
        public record UpdateBookDto(string Description, string Genre);

    }
}
