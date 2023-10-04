using BookWebApp.Auth.Model;
using System.ComponentModel.DataAnnotations;

namespace BookWebApp.Data.Entities
{
    public class Review : IUserOwnedResource
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreationDate { get; set; }
        
        public Book Book { get; set; }

        [Required]
        public string UserId { get; set; }
        public ForumRestUser User { get; set; }
    }
}
