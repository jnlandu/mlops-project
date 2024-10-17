import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react'
import { MdLogout } from 'react-icons/md';
import AuthContext from '../context/AuthContext';

const AdminHeader = () => {
    const { logout } = useContext(AuthContext);

    return (
    <div className='mt-3 mb-4  header' >
    <div className="ms-2 py-4 px-4">
       <Link href="/">
        <Image 
        src="/assets/images/okapi.jpg"
        alt="logo" 
        width={30} 
        height={30}
        className='ms-2 rounded-circle'
        /> <br/>
        <small className='text-white'>Okapi AI</small>
       </Link>
    </div>
    
    <div className="d-flex   gap-2  ">
     <div className='d-flex align-items-center gap-2 '>
     <Link href="/">
      <Image 
        src="/assets/icons/user.svg"
        alt="logo" 
        width={30} 
        height={30}
        className='ms-1 rounded-circle border '
        /> 
 
     <small className='text-white'>Admin</small>
     </Link>
     </div>
        <a onClick={logout} className="btn  btn-danger">
            <MdLogout size={20} className="" />Logout
        </a>
    </div>
  </div>
  )
}

export default AdminHeader