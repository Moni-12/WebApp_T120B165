import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';

interface Author {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  aboutAuthor: string;
}

interface Book {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  genre: string;
  author: Author;
}


const HomePage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

const fetchAuthorsAndBooks = async () => {
    try {
      const authorsResponse = await axios.get<Author[]>("https://whale-app-4h4zj.ondigitalocean.app/api/authors");
      setAuthors(authorsResponse.data);
  
      const bookPromises = authorsResponse.data.map(async (author) => {
        try {
          const response = await axios.get<Book[]>(`https://whale-app-4h4zj.ondigitalocean.app/api/authors/${author.id}/books`);
          return response.data;
        } catch (error) {
          console.error("Error fetching books:", error);
          return [];
        }
      });
  
      const bookResponses = await Promise.all(bookPromises);
      const allBooks = bookResponses.flat(); // Flatten the array of arrays
  
      setBooks(allBooks);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };
  
  useEffect(() => {
    fetchAuthorsAndBooks();
  }, []);
  
return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
            <h1>Books</h1>
            <ul role="list" className="divide-y divide-gray-100">
                {books.map((book) => (
                    <li className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{book.title}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">By {book.author.firstName} {book.author.lastName}</p>
                        </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">Release date</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">Release date: {new Date(book.releaseDate).toLocaleDateString("lt-LT")}</p>
                        </div>
                    </li>
                ))}

            </ul>
            
     </div>
    </div>
  );
};

export default HomePage;