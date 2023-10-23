import React, { useState, useEffect } from "react";
import axios from "axios";

interface Author {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  aboutAuthor: string;
}

const AuthorList: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get<Author[]>("http://your-api-url-here");
        setAuthors(response.data);
      } catch (error) {
        // Handle error
        console.error("Error fetching data:", error);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div>
      <h1>Authors List</h1>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            <h2>{author.firstName} {author.lastName}</h2>
            <p>Date of Birth: {author.dateOfBirth}</p>
            <p>About Author: {author.aboutAuthor}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorList;
