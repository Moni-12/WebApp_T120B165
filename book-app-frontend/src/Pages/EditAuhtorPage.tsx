import axios from "axios";
import React, { useEffect, useState } from "react";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from "react-router-dom";
import { Author } from "../Models/Author";
import { resolve } from "path";

// import DatePicker from 'flowbite',

const EditAuthorPage: React.FC = () => {
  const accessToken = localStorage.getItem('authJwt');

  const { authorid } = useParams<{ authorid: string }>();

  const [author, setAuthor] = useState<Author>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [aboutAuthor, setAboutAuthor] = useState<string | undefined>(author?.aboutAuthor);
  const [error, setError] = useState("");


  const fetchAuthor = async () => {
    try {
      const response = await axios.get<Author>(`https://whale-app-4h4zj.ondigitalocean.app/api/authors/${authorid}`);
      console.log(response.data, "response author")
      setAuthor(response.data);
      setAboutAuthor(response.data.aboutAuthor || '');
      let dateOfBirth = typeof(response.data.dateOfBirth) === "string" ? new Date(response.data.dateOfBirth) : null;
      setSelectedDate(dateOfBirth);
      console.log(author, "author");
      
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, []);



  const handleSubmit = async (e: React.FormEvent) => {

      e.preventDefault();
      console.log("handle Submit")


      console.log("after timeout");
      try {
        const response = await axios.put(`https://whale-app-4h4zj.ondigitalocean.app/api/authors/${authorid}`,
          { 
            AboutAuthor: aboutAuthor,
            PictureBase64: author?.pictureBase64
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`, // Replace with your actual access token
            },
          }
        );
        window.location.href = "/authors-list";
      } catch (error) {
        setError("Update atuhor fail.");
        console.error("Error logging in:", error);
      }
  };

  const handleCancel = () => {
    window.location.href = "/authors-list";
  };


  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> */}
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Edit author</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
            <div>
              <label htmlFor="firsName" className="block text-sm font-medium text-gray-700">Author's first name</label>
              <div className="mt-1">
                <input id="firsName" name="firsName" type="text" autoComplete="firsName" required className="block w-full appearance-none rounded-md border-none border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={author?.firstName}
                  disabled />
              </div>
            </div>

            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Author's last name</label>
              <div className="mt-1">
                <input id="lastname" name="lastname" type="text" autoComplete="lastname" required className="block w-full appearance-none rounded-md border-none border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={author?.lastName}
                  disabled />
              </div>
            </div>

            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Author's date of birth</label>
                <div className="mt-1 w-full">
                <DatePicker
                  placeholderText="2000-01-01"
                  selected={selectedDate}
                  disabled
                  onChange={() => console.log(selectedDate)}
                  dateFormat="yyyy-MM-dd" // Customize the date format
                  className="block w-full appearance-none rounded-md border-none border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                </div>
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">About author</label>
              <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
              <div className="px-4 py-2 bg-white rounded-t-lg ">
                          <textarea id="comment"  className="w-full px-0 text-sm text-gray-900 bg-white border-0 " placeholder="About author" 
                            value={aboutAuthor}
                            required
                            onChange={(e) => {setAboutAuthor(e.target.value)}}
                            ></textarea>
              </div>
              </div>
            </div>


            <br></br>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleSubmit}
              >
                Update
              </button>
              <button
                type="button"
                className="mt-3 flex w-full justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                // Add the functionality to cancel the update
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          


        </div>
      </div>
    </div>
  );
};

export default EditAuthorPage;