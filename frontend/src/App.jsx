// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserForm from './components/User';
import UserList from './components/UserList';
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">User Form</Link>
            </li>
            <li>
              <Link to="/users">User List</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<><h1>User Form</h1><UserForm /></>} />
          <Route path="/users" element={<><h1>User List</h1><UserList /></>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
