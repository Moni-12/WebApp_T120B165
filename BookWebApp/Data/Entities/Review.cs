namespace BookWebApp.Data.Entities
{
    public class Review
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreationDate { get; set; }
        
        public Book Book { get; set; }
    }
}
