using Azure.Identity;
using BookWebApp.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookWebApp.Data.Repositories
{
    public interface IBooksRepository
    {
        Task CreateAsync(Book book);
        Task DeleteAsync(Book book);
        Task<IReadOnlyList<Book>> GetListAsync(int authorId);
        Task<Book> GetOneAsync(int authorId, int bookId);
        Task UpdateAsync(Book book);
    }

    public class BooksRepository : IBooksRepository
    {
        private readonly ForumDbContext _forumDbContext;

        public BooksRepository(ForumDbContext forumDbContext)
        {
            _forumDbContext = forumDbContext;
        }

        public async Task<Book> GetOneAsync(int authorId, int bookId)
        {
            return await _forumDbContext.Books.FirstOrDefaultAsync(x => x.Id == bookId && x.Author.Id == authorId);
        }

        public async Task<IReadOnlyList<Book>> GetListAsync(int authorId)
        {
            return await _forumDbContext.Books.Where(x => x.Author.Id == authorId).ToListAsync();
        }

        public async Task CreateAsync(Book book)
        {
            _forumDbContext.Books.Add(book);
            await _forumDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Book book)
        {
            _forumDbContext.Books.Update(book);
            await _forumDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Book book)
        {
            _forumDbContext.Books.Remove(book);
            await _forumDbContext.SaveChangesAsync();
        }
    }
}
