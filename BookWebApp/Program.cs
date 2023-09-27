using BookWebApp.Data;
using BookWebApp.Data.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<ForumDbContext>();
builder.Services.AddTransient<IAuthorsRepository, AuthorsRepository>();
builder.Services.AddTransient<IBooksRepository, BooksRepository>();
builder.Services.AddTransient<IReviewsRepository, ReviewsRepository>();

var app = builder.Build();

app.UseRouting();
app.MapControllers();

app.Run();
