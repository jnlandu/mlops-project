'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../src/hooks/useAuth";
import Spinner from "react-bootstrap/esm/Spinner";
import Image from "next/image";

const Login = () => {
    const router = useRouter();
    const { login, isLoading } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        try {
            await login(username, password);
            // Navigation is handled in the login function
        } catch (error: any) {
            setError(error.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="my-4">
        <div className="container mt-3 mb-1" >
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
            {/* Left side bar  */}
        <div className="container row  d-flex " >
                <section className="col-md-6 d-flex flex-column justify-content-center mt-5">
                        <div className="mx-auto">
                            <Image 
                                alt="brand"
                                src="/assets/images/brand.png"
                                width={1000}
                                height={1000}
                                className="d-none d-md-block  "
                                style={{ maxWidth: '100%', height: '100%', width: '1000%', }}
                            />
                        </div>
                </section>

                {/* Right section: login form */}
                <div className="col-md-6 d-flex flex-column  mb-2 mt-4">
                    <div className="intro-text mt-5">
                        <h1 className="mb-1">Welcome 👋!</h1>
                        <p className="mb-4 small">Sign in to your account to generate  chat and 
                            make image classification with our  latest AI models.
                        </p>
                    </div>
                    <section className="login-section container">
                        <h2 className="mb-4">Sign in</h2>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input 
                                    type="text" 
                                    className="input form-control" 
                                    id="username" 
                                    value={username} 
                                    placeholder="Enter your username"
                                    onChange={(e) => setUsername(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    className="input form-control" 
                                    id="password"
                                    value={password}
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                                <a href="" onClick={() => router.push('/forgot-password/')}>
                                    <small className="small">Forgot password?</small>
                                </a>
                            </div>
                            <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                                {isLoading ? (
                                    <Spinner animation="border" role="status" />
                                ) : 'Sign In'}
                            </button>
                        </form>

                     <div className="d-flex mt-2 gap-2 justify-content-between">
                        <div className="d-flex mt-2 gap-2">
                            <small className="small mt-0">Don't have an account yet?</small>
                            <small className="text-brand-secondary"><a className=" mt-0" href="" onClick={() => router.push('/register/')}
                                >
                                Sign up
                            </a>
                            </small>
                        </div>
                        <div className="text-end mt-2">
                            <a href="" className="text-brand-secondary" onClick={() => router.push('/admin/login')}>
                                <small className="">Admin?</small>
                            </a>
                        </div>
                    </div>
                    </section>
                </div>
        </div>
</div>
    );
};

export default Login;
