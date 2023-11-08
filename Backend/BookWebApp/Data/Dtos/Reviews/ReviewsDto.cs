using BookWebApp.Auth.Model;
using BookWebApp.Data.Entities;

namespace BookWebApp.Data.Dtos.Reviews
{
    public class ReviewsDto
    {
        public record ReviewDto(int Id, string Content, DateTime CreationDate, ForumRestUser User);
        public record CreateReviewDto(string Content);
        public record UpdateReviewDto(string Content);
    }
}
