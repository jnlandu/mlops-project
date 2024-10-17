'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { userData } from '../../constants/users.dt'
import UserModal from '../UserModal';
import PropTypes from 'prop-types';

const DataTable = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const  users = userData

  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  //   const apiUrl = process.env.NEXT_PUBLIC_FASTAPI_API_URL + '/users'; // Corrected URL usage
  //   console.log('Stored token:', storedToken);
  //   console.log('API URL:', apiUrl); // Verify the full API URL
  //   if (storedToken) {
  //     const apiUrl = process.env.NEXT_PUBLIC_FASTAPI_API_URL + '/users/'; // Corrected URL usage
  //     console.log('API URL:', apiUrl); // Verify the full API URL
  //     axios.get(apiUrl, {
  //       headers: { Authorization: `Bearer ${storedToken}` }
  //     })
  //     .then(response => {
  //       console.log('Fetched users:', response.data);
  //       setUsers(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching users:', error);
  //       console.log(error.response); // Detailed error response
  //     });
  //   }
  // }, []);
  
  const handleDelete = (userId) => {
    // Placeholder for delete functionality
    console.log("Delete user with ID:", userId);
    // Here you would usually make an API call to delete the user
  };

  const handleUpdate = (userId) => {
    // Placeholder for update functionality
    console.log("Update user with ID:", userId);
    // Here you would usually make an API call to update the user
  }




  return (
<div className='mt-3'>
    <Table 
    striped 
    // striped="columns"
    bordered 
    hover 
    variant='dark'
    size="sm" 
    responsive="lg" 
    bsPrefix='table'
    // className='container mt-3 bg-dark'
    >
      <thead>
        <tr >
          <th>#</th>
          <th>Name</th>
          <th>Password</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className='container'>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.hashed_password}</td>
            <td>
              <button variant="warning" className='m-2 p-1' onClick={() => handleUpdate(user.id)}>Update</button>

              <button 
              variant="danger" 
              className='m-2 p-1' 
              // onClick={() => handleDelete(user.id)}
              onClick={handleShow}
              >
              Delete
              </button>

            </td>
          </tr>
        ))}
      </tbody>
    </Table>
     <UserModal show={show} handleClose={handleClose} />
    </div>
  );

}


export default DataTable;
