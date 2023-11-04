import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';
import BooksSvg from '../svg/BooksSvg';

import { Author } from '../Models/Author';
import { Book } from '../Models/Book';

const HomePage: React.FC = () => {
  const userRolesJson = localStorage.getItem('roles');
  const isAdmin = userRolesJson?.includes('Admin');
  const accessToken = localStorage.getItem('authJwt');

  const [authors, setAuthors] = useState<Author[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

const fetchAuthorsAndBooks = async () => {
    try {
      const authorsResponse = await axios.get<Author[]>("https://whale-app-4h4zj.ondigitalocean.app/api/authors");
      setAuthors(authorsResponse.data);
  
    //   const bookPromises = authorsResponse.data.map(async (author) => {
	authorsResponse.data.map(async (author) => {
        try {
          const response = await axios.get<Book[]>(`https://whale-app-4h4zj.ondigitalocean.app/api/authors/${author.id}/books`);
        //   return response.data;
		  setBooks((prevBooks) => [...prevBooks, ...response.data]);
        } catch (error) {
          console.error("Error fetching books:", error);
          return [];
        }
      });
  
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };
  let fetchCount = 0;
  useEffect(() => {
    if (fetchCount === 0) {
      fetchCount = fetchCount + 1;
      fetchAuthorsAndBooks();
    }
  }, []);

  const deleteBook = async (authorid: number, bookid: number) => {
    try {
      const response = await axios.delete(`https://whale-app-4h4zj.ondigitalocean.app/api/authors/${authorid}/books/${bookid}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookid && book.author.id !== authorid));
      // Handle the response if necessary
      console.log('Book deleted successfully:', response.data);
    } catch (error) {
      // Handle any errors
      console.error('Error deleting the book:', error);
    }
  };
  
return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
            <h1>Books</h1>
        <ul role="list" className="divide-y divide-gray-100">
          {books.map((book) => (
              <li className="flex justify-between gap-x-6 py-5">
            <Link to={`/author/${book.author.id}/book/${book.id}`} key={book.id}>

                <div className="flex min-w-0 gap-x-4">
                  <BooksSvg className="blinking-icon" />
                      
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{book.title}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">By {book.author.firstName} {book.author.lastName}</p> 
                  </div>
                </div>
                         <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                         </div>
              </Link>
                
                         {(isAdmin) && (
            <div className="flex flex-end items-center ml-auto max-w-md">
              <div className="text-gray-500" 
              onClick={() => window.location.href = `/author/${book.author.id}/book/${book.id}/edit-book`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.5 14.999V17.5a1 1 0 001 1h2.501a1 1 0 00.7-.3l8.5-8.5a1 1 0 00.3-.7v-2.501a1 1 0 00-1-1H3.5a1 1 0 00-1 1v9.999a1 1 0 001 1zm3.2-.7l7.1-7.1 2.1 2.1-7.1 7.1H6.7v-2.1zM14.5 4l1.7-1.7a1 1 0 011.4 0l2.3 2.3a1 1 0 010 1.4l-8.5 8.5H6v-8.5L14.5 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-gray-500"
                onClick={() => deleteBook(book.author.id, book.id)}
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            )}
              </li>
          ))}
        </ul>
            
     </div>
    </div>
  );
};

export default HomePage;