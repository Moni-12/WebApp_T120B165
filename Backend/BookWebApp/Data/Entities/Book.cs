﻿using BookWebApp.Auth.Model;
using System.ComponentModel.DataAnnotations;

namespace BookWebApp.Data.Entities
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Genre { get; set; }

        public Author Author { get; set; }
    }
}
