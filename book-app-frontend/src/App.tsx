import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Auth/Login';
import Register from './Auth/Register';
import axios from 'axios';
import Footer from "./Footer";
import HomePage from './Pages/HomePage';
import Header from './Header';
import AuthorsPage from './Pages/AuthorsPage';
import OneBookPage from './Pages/OneBookPage';
import CreateAuthorPage from './Pages/CreateAuthorPage';
import EditAuthorPage from './Pages/EditAuhtorPage';
import CreateBookPage from './Pages/CreateBookPage';
import EditBookPage from './Pages/EditBookPage';
import NotFound from './Pages/NotFound';


function App() {
  const userRolesJson = localStorage.getItem('roles');
  const isAdmin = userRolesJson?.includes('Admin');
  return (
    <>
      <Header />
      <Router>
        <div>
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/authors-list" Component={AuthorsPage} />
            <Route path="/author/:authorid/book/:bookid" Component={OneBookPage} />
          {(isAdmin) && (
            <>
              <Route path="/create-author" Component={CreateAuthorPage} />
              <Route path="/edit-author/:authorid" Component={EditAuthorPage} />
              <Route path="/author/:authorid/create-book" Component={CreateBookPage} />
              <Route path="/author/:authorid/book/:bookid/edit-book" Component={EditBookPage} />
            </>
            )}
            <Route path="*" Component={NotFound} />
          </Routes>
        </div>
      </Router>
      
      <Footer /></>

  );
}

export default App;
