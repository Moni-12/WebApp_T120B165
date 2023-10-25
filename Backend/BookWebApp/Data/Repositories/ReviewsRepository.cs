using BookWebApp.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookWebApp.Data.Repositories
{
    public interface IReviewsRepository
    {
        Task CreateAsync(Review review);
        Task DeleteAsync(Review review);
        Task<IReadOnlyList<Review>> GetListAsync(int bookId);
        Task<Review> GetOneAsync(int bookId, int reviewId);
        Task UpdateAsync(Review review);
    }

    public class ReviewsRepository : IReviewsRepository
    {
        private readonly ForumDbContext _forumDbContext;

        public ReviewsRepository(ForumDbContext forumDbContext)
        {
            _forumDbContext = forumDbContext;
        }

        public async Task<Review> GetOneAsync(int bookId, int reviewId)
        {
            return await _forumDbContext.Reviews.Include(r => r.User).FirstOrDefaultAsync(x => x.Id == reviewId && x.Book.Id == bookId);
        }

        public async Task<IReadOnlyList<Review>> GetListAsync(int bookId)
        {
            return await _forumDbContext.Reviews.Include(r => r.User).Where(x => x.Book.Id == bookId).ToListAsync();
        }

        public async Task CreateAsync(Review review)
        {
            _forumDbContext.Reviews.Add(review);
            await _forumDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Review review)
        {
            _forumDbContext.Reviews.Update(review);
            await _forumDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Review review)
        {
            _forumDbContext.Reviews.Remove(review);
            await _forumDbContext.SaveChangesAsync();
        }
    }
}
