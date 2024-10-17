'use client';
// import AuthContext from '@/context/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import AuthContext from '../context/AuthContext';



const Header = () => {
  const { logout } = useContext(AuthContext);
  const [userName, setUserName] = useState(null);
  const [initials, setInitials] = useState(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem('user');
    if (storedUserName) {
      setUserName(storedUserName);
      if (storedUserName.length > 2) {
       setInitials(storedUserName.substring(0,2).toUpperCase());
      }else{
       setInitials(storedUserName.substring(0).toUpperCase());
      }
    }
  }, []);

  return (
    // <div style={{ position: 'sticky', top: '0', zIndex: '1000', width: '100%' }}>
    <div className='mt-3 mb-4  header' >
       <div className="user-initials ms-2 py-4 px-4">
            {initials}
        </div>

      <div className="d-flex justify-content-end align-items-center github-logout-btn ">
       
        <a href="https://github.com/jnlandu/text-summarization" target="_blank" rel="noopener noreferrer" className="">
          <FaGithub size={25} className="me-3" />
        </a>

        <button onClick={logout} className="btn logout-btn btn-danger">
          <MdLogout size={24} className="me-1 mb-1" />Logout
        </button>
      </div>
    </div>
    // </div>
  );
};

export default Header;