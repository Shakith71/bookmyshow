// src/components/UserList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

const UserList = () => {
  const [user, setUsers] = useState([]);
  const {id} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${id}`);
        console.log(response.data)
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="user-list-container">
      <h1>User Details</h1>
      <ul className="user-list">
        
          <li key={user._id}>
            <p>Name: {user.email}</p>
          </li>
        
      </ul>
    </div>
  );
};

export default UserList;