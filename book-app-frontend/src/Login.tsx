import React, { useState } from "react";
import axios from "axios";

interface LoginDto {
  userName: string;
  password: string;
}

const Login: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://whale-app-4h4zj.ondigitalocean.app/api/login", { userName, password });
      // Handle successful login, such as storing tokens in local storage and redirecting to another page
      console.log("Login successful", response.data);
    } catch (error) {
      // Handle login error
      setError("Username or password is invalid.");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;