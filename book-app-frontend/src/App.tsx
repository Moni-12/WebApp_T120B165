import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthorList from "./AuthorList"; // Assuming your AuthorList component file is named AuthorList.tsx
import Login from './Login';


function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Router>
    <div>
      <Routes>
        <Route path="/authors-list" Component={AuthorList} />
        <Route path="/login" Component={Login} />
        {/* Other routes can be added here */}
      </Routes>
    </div>
  </Router>
  );
}

export default App;
