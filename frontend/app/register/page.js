'use client';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import AuthContext from '../../context/AuthContext';
import Spinner from 'react-bootstrap/esm/Spinner';
import Image from 'next/image';

const SignUp = () => {
  const { login } = useContext(AuthContext);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_FASTAPI_API_URL}/auth/` // ?? http://localhost:8000/auth`;
      const response = await axios.post(apiUrl, { // Ensure the trailing slash if your backend setup requires it
        username: registerEmail, // Changed 'Email' to 'username' if your backend expects 'username'
        password: registerPassword,
      });
      console.log('Registration successful', response.data);
      setLoading(true);  // show the spinner
      await login(registerEmail, registerPassword); // Assuming 'login' handles the logic properly
      setLoading(false); // hide the spinner
    } catch(error) {
      console.error('Failed to register user:', error.response ? error.response.data : error);
      setLoading(false); // hide the spinner

    }
  }
  

  return (
  <div className="my-4 ">
     <div className="container mt-2 mb-1" >
            <Image 
                src="/assets/images/okapi.jpg"
                height={35}
                width={35}
                alt="logo"
                className="rounded-circle ms-2"
            />
            <span className=" mt-0">
                <h6 className="small">Okapi AI </h6>
            </span>
        </div>

    <div className="container row  d-flex " >
            <section className="col-md-6 d-flex flex-column justify-content-center mt-5">
                    <div className="mx-auto">
                        <Image 
                            alt="brand"
                            src="/assets/images/brand.png"
                            width={1000}
                            height={1000}
                            className="d-none d-md-block h-100 w-100"
                            style={{ maxWidth: '100%', objectFit: 'cover' }}
                        />
                    </div>
            </section>

            {/* Right section: login form */}
            <div className="col-md-6 d-flex flex-column  mb-2 mt-4">
                <div className="intro-text mt-5">
                    <h1 className="mb-1">Welcome 👋!</h1>
                    <p className="small mb-4">Create a free account to start generating summary for your text documents, and more.
                    </p>
                </div>
                <section className="login-section container">
                    <h2 className="mb-4">Create an account</h2>
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label htmlFor="registerEmail" className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="input form-control" 
                                id="registerEmail"
                                value={registerEmail}
                                placeholder="Enter your email"
                                onChange={(e) => setRegisterEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="registerPassword" className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="input form-control" 
                                id="registerPassword"
                                value={registerPassword}
                                placeholder="Enter your password"
                                onChange={(e) => setRegisterPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            {loading ? (
                                <Spinner animation="border" role="status" />
                            ) : 'Sign Up'}
                        </button>
                    </form>
                    <div className="container mt-3">
                      <small>Do you already have an account? </small> 
                      <small  className="text-brand-secondary"> <a href='' className=" mt-0" onClick={() => router.push('/login/')}
                      
                      >Sign in </a></small>
                    </div>
                </section>
            </div>
    </div>
</div>
  );
}

export default SignUp;
