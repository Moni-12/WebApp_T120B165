import axios from "axios";
import React, { useState } from "react";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// import DatePicker from 'flowbite',

const CreateAuthorPage: React.FC = () => {
  const accessToken = localStorage.getItem('authJwt');

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [base64String, setBase64String] = useState<string>('');
  const [aboutAuthor, setAboutAuthor] = useState<string>('');

  const [error, setError] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (firstName === "" || lastName === "" || selectedDate === null || aboutAuthor === "") {
      setError("First name, last name, date of birth and about author are required");
    } else {
      e.preventDefault();
      await handleUpload();
      try {
        const response = await axios.post(
          `https://whale-app-4h4zj.ondigitalocean.app/api/authors`,
          { FirstName: firstName,
            LastName: lastName,
            DateOfBirth: selectedDate,
            AboutAuthor: aboutAuthor,
            PictureBase64: base64String
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
        setError("Create atuhor fail.");
        console.error("Error logging in:", error);
      }
    }
    
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBase64String(reader.result as string);
        console.log(base64String);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleCancel = () => {
    window.location.href = "/authors-list";
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> */}
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create new author</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
            <div>
              <label htmlFor="firsName" className="block text-sm font-medium text-gray-700">Author's first name</label>
              <div className="mt-1">
                <input id="firsName" name="firsName" type="text" autoComplete="firsName" required className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)} />
              </div>
            </div>

            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Author's last name</label>
              <div className="mt-1">
                <input id="lastname" name="lastname" type="text" autoComplete="lastname" required className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>

            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Author's date of birth</label>
                <div className="mt-1 w-full">
                <DatePicker
                  placeholderText="2000-01-01"
                  selected={selectedDate}
                  onChange={(e) => handleDateChange(e)}
                  dateFormat="yyyy-MM-dd" // Customize the date format
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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

            <div>
              <label
                htmlFor="formFile"
                className="block text-sm font-medium text-gray-700">
                  Upload author's picture
              </label>
              <input
                className="relative m-0 block w-full min-w-0 flex-auto rounded-md border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-indigo-600 dark:file:text-neutral-100 dark:focus:border-primary"
                type="file"
                id="formFile"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange}/>
            </div>

            <br></br>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleSubmit}
              >
                Create
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

export default CreateAuthorPage;