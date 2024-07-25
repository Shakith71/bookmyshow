// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserForm from './components/User';
import UserList from './components/UserList';
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <Router>
    

        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/users/:id" element={<><h1>User List</h1><UserList /></>} />
        </Routes>
    
    </Router>
  );
};

export default App;
