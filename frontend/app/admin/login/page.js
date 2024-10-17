'use client';
import { useContext, useState } from "react";
// import axios from "axios";
// import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/navigation";


import AuthContext from "../../../context/AuthContext";
import PasskeyModal from "../../../components/PasskeyModal";

const Login = (searchParams ) => {
    const router = useRouter();
    const { login } = useContext(AuthContext);
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const isAdmin = searchParams.admin === 'true';
    const handleSubmit = async (e) => {
        e.preventDefault();
        login(Email, password);
    };

    return (
        <div className="container login">
        <div className=" flex w-100 justify-content-center">
                {!isAdmin  && <PasskeyModal/>}
        </div>
        <div className="container login">
            
            <h2 className="hr">Sign in</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="Email" 
                        value={Email} 
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                <a href=""
                 onClick={() => router.push('/forgot-password/')}
                //  To be implemented
                 ><small>Forgot password ? </small> </a>
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
              <div className="flex-fill text-start mt-2">
                <a href="#"
                 onClick = {() => router.push('/login') }
                 >
                <small> Not an admin ? </small>  <small className="text-primary">sign in </small>
                </a>
            </div>
        </div>
    </div>
    );
};

export default Login;
