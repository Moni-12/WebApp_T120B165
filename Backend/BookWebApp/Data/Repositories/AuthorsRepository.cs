using BookWebApp.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookWebApp.Data.Repositories
{
    public interface IAuthorsRepository
    {
        Task CreateAsync(Author author);
        Task DeleteAsync(Author author);
        Task<IReadOnlyList<Author>> GetListAsync();
        Task<Author> GetOneAsync(int authorId);
        Task UpdateAsync(Author author);
    }
    public class AuthorsRepository : IAuthorsRepository
    {
        private readonly ForumDbContext _forumDbContext;

        public AuthorsRepository(ForumDbContext forumDbContext)
        {
            _forumDbContext = forumDbContext;
        }

        public async Task<Author> GetOneAsync(int authorId)
        {
            return await _forumDbContext.Authors.FirstOrDefaultAsync(o => o.Id == authorId);
        }

        public async Task<IReadOnlyList<Author>> GetListAsync()
        {
            return await _forumDbContext.Authors.ToListAsync();
        }

        public async Task CreateAsync(Author author)
        {
            _forumDbContext.Authors.Add(author);
            await _forumDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Author author)
        {
            _forumDbContext.Authors.Update(author);
            await _forumDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Author author)
        {
            _forumDbContext.Authors.Remove(author);
            await _forumDbContext.SaveChangesAsync();
        }
    }
}
