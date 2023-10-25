import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Author } from '../Models/Author';
import AuthorModal from './Modals/AuthorModal';

const AuthorsPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  const fetchAuthors = async () => {
    try {
      const authorsResponse = await axios.get<Author[]>("https://whale-app-4h4zj.ondigitalocean.app/api/authors");
      setAuthors(authorsResponse.data);
    } catch (error) {
      // Handle error
    }
  };
  
  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleAuthorClick = (author: Author) => {
    setSelectedAuthor(author);
  };
  
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <h1>Authors</h1>
        <ul role="list" className="divide-y divide-gray-100">
          {authors.map((author) => (
              <li 
                key={author.id}
                className="flex justify-between gap-x-6 py-5"
                onClick={() => handleAuthorClick(author)}>
                         <div className="flex min-w-0 gap-x-4">
                         <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                         <div className="min-w-0 flex-auto">
                             <p className="text-sm font-semibold leading-6 text-gray-900">{author.firstName} {author.lastName}</p>
                             <p className="mt-1 truncate text-xs leading-5 text-gray-500">Born {new Date(author.dateOfBirth).toLocaleDateString("lt-LT")}</p>
                         </div>
                         </div>
                         <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                         </div>
              </li>
          ))}
        </ul>
      </div>
      {selectedAuthor && (
        <AuthorModal
          author={selectedAuthor}
          onClose={() => setSelectedAuthor(null)}
        />
      )}
      </div>
  );
};

export default AuthorsPage;
