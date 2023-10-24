import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Register: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://whale-app-4h4zj.ondigitalocean.app/api/register", {
        userName,
        email,
        password,
      });
      setError("Registration successful.");
      console.log("Registration successful");
      // Redirect to another page or perform other actions
    } catch (error) {
      setError("Username or password is invalid.");
      console.error("Error while doing registration in:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register a new account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or
          <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500"> Login</a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Username</label>
              <div className="mt-1">
                <input id="userName" name="userName" type="text" autoComplete="userName" required className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)}
                  />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1">
                <input id="email" name="email" type="email" autoComplete="email" required className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleSubmit}>
                  Register
                </button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>

          
        </div>
      </div>
    </div>

  );
};

export default Register;