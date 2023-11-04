import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Author } from '../Models/Author';
import AuthorModal from './Modals/AuthorModal';

const AuthorsPage: React.FC = () => {
  const userRolesJson = localStorage.getItem('roles');
  const isAdmin = userRolesJson?.includes('Admin');
  const accessToken = localStorage.getItem('authJwt');

  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  const fetchAuthors = async () => {
    try {
      const authorsResponse = await axios.get<Author[]>("https://whale-app-4h4zj.ondigitalocean.app/api/authors");
      setAuthors(authorsResponse.data);
      console.log(authors);
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

  const deleteAuthor = async (authorid: number) => {
    try {
      const response = await axios.delete(`https://whale-app-4h4zj.ondigitalocean.app/api/authors/${authorid}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setAuthors(prevAuthors => prevAuthors.filter(author => author.id !== authorid));
      // Handle the response if necessary
      console.log('Author deleted successfully:', response.data);
    } catch (error) {
      // Handle any errors
      console.error('Error deleting the Author:', error);
    }
  };
  
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        {/* <h1>Authors</h1> */}
        <div className="sm:mx-auto sm:w-full sm:max-w-lg flex justify-between items-center">
          <h1>Authors</h1>
          {isAdmin && (
          <a href="/create-author" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Create new author
          </a>
          )}
        </div>
        <ul role="list" className="divide-y divide-gray-100">
          {authors.map((author) => (
              <li 
                key={author.id}
                className="flex justify-between gap-x-6 py-5"
                // onClick={(e) => {
                //   const target = e.target as HTMLElement;
                //   if (
                //     !target.classList.contains("text-gray-500") &&
                //     !target.classList.contains("h-5") &&
                //     !target.classList.contains("w-5")
                //   ) {
                //     handleAuthorClick(author);
                //   }
                // }}
                >
                <div className="flex min-w-0 gap-x-4">
                  <div
                  onClick={(e) => {
                      handleAuthorClick(author);
                  }}>
                        {author.pictureBase64 !== null && author.pictureBase64 !== "" &&(
                         <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={author.pictureBase64} alt="Uploaded" />
                         )}
                         {author.pictureBase64 === null || author.pictureBase64 === "" && (
                          <svg fill="#000000" height="48px" width="48px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                          viewBox="0 0 402.161 402.161" xmlSpace="preserve">
                            <g>
                              <g>
                                <g>
                                  <path d="M201.08,49.778c-38.794,0-70.355,31.561-70.355,70.355c0,18.828,7.425,40.193,19.862,57.151
                                    c14.067,19.181,32,29.745,50.493,29.745c18.494,0,36.426-10.563,50.494-29.745c12.437-16.958,19.862-38.323,19.862-57.151
                                    C271.436,81.339,239.874,49.778,201.08,49.778z M201.08,192.029c-13.396,0-27.391-8.607-38.397-23.616
                                    c-10.46-14.262-16.958-32.762-16.958-48.28c0-30.523,24.832-55.355,55.355-55.355s55.355,24.832,55.355,55.355
                                    C256.436,151.824,230.372,192.029,201.08,192.029z"/>
                                  <path d="M201.08,0C109.387,0,34.788,74.598,34.788,166.292c0,91.693,74.598,166.292,166.292,166.292
                                    s166.292-74.598,166.292-166.292C367.372,74.598,292.773,0,201.08,0z M201.08,317.584c-30.099-0.001-58.171-8.839-81.763-24.052
                                    c0.82-22.969,11.218-44.503,28.824-59.454c6.996-5.941,17.212-6.59,25.422-1.615c8.868,5.374,18.127,8.099,27.52,8.099
                                    c9.391,0,18.647-2.724,27.511-8.095c8.201-4.97,18.39-4.345,25.353,1.555c17.619,14.93,28.076,36.526,28.895,59.512
                                    C259.25,308.746,231.178,317.584,201.08,317.584z M296.981,283.218c-3.239-23.483-15.011-45.111-33.337-60.64
                                    c-11.89-10.074-29.1-11.256-42.824-2.939c-12.974,7.861-26.506,7.86-39.483-0.004c-13.74-8.327-30.981-7.116-42.906,3.01
                                    c-18.31,15.549-30.035,37.115-33.265,60.563c-33.789-27.77-55.378-69.868-55.378-116.915C49.788,82.869,117.658,15,201.08,15
                                    c83.423,0,151.292,67.869,151.292,151.292C352.372,213.345,330.778,255.448,296.981,283.218z"/>
                                  <path d="M302.806,352.372H99.354c-4.142,0-7.5,3.358-7.5,7.5c0,4.142,3.358,7.5,7.5,7.5h203.452c4.142,0,7.5-3.358,7.5-7.5
                                    C310.307,355.73,306.948,352.372,302.806,352.372z"/>
                                  <path d="M302.806,387.161H99.354c-4.142,0-7.5,3.358-7.5,7.5c0,4.142,3.358,7.5,7.5,7.5h203.452c4.142,0,7.5-3.358,7.5-7.5
                                    C310.307,390.519,306.948,387.161,302.806,387.161z"/>
                                </g>
                              </g>
                            </g>
                       </svg>
                         )}
                         <div className="min-w-0 flex-auto">
                             <p className="text-sm font-semibold leading-6 text-gray-900">{author.firstName} {author.lastName}</p>
                             <p className="mt-1 truncate text-xs leading-5 text-gray-500">Born {new Date(author.dateOfBirth).toLocaleDateString("lt-LT")}</p>
                         </div>
                         </div>
                         <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                         </div>
                    </div>
                         {(isAdmin) && (
            <div className="flex flex-end items-center ml-auto max-w-md">
              <div className="text-gray-500" 
              onClick={() => window.location.href = `/edit-author/${author.id}`}
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
                onClick={() => deleteAuthor(author.id)}
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
