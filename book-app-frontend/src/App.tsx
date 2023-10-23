import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Register from './Pages/Register';
import axios from 'axios';
import Footer from "./Footer";
import HomePage from './Pages/HomePage';


function App() {
  
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
          </Routes>
        </div>
      </Router>
      
      <Footer /></>

  );
}

export default App;
