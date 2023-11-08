using BookWebApp.Auth.Model;
using BookWebApp.Data.Entities;

namespace BookWebApp.Data.Dtos.Reviews
{
    public class ReviewsDto
    {
        public record ReviewDto(int Id, string Content, DateTime CreationDate, string userName, string userId);
        public record AfterChangeReviewDto(int Id, string Content, DateTime CreationDate);
        public record CreateReviewDto(string Content);
        public record UpdateReviewDto(string Content);
    }
}
