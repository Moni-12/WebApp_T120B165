using BookWebApp.Auth.Model;
using BookWebApp.Data.Entities;

namespace BookWebApp.Data.Dtos.Reviews
{
    public class ReviewsDto
    {
        public record ReviewDto(int Id, string Content, DateTime CreationDate, Book Book, string UserId);
        public record CreateReviewDto(string Content);
        public record UpdateReviewDto(string Content);
    }
}
