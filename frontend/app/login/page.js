'use client';
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "../../context/AuthContext";

import PropTypes from "prop-types";
import Spinner from "react-bootstrap/esm/Spinner";
import Image from "next/image";

const Login = () => {
    const router = useRouter();
    const { login } = useContext(AuthContext);
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // show the spinner
        await login(Email, password);
        setLoading(false); // hide the spinner
    };

    return (
        <div className="my-4">
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
                                src="/assets/icons/dalle.svg"
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
                        <p className="mb-4">Sign in to your account to generate summary for your text documents, or chat and 
                            make image classification with our  latest AI models.
                        </p>
                    </div>
                    <section className="login-section container">
                        <h2 className="mb-4">Sign in</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="Email" className="form-label">Email</label>
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
                                <a href="#" onClick={() => router.push('/forgot-password/')}>
                                    <small className="small">Forgot password?</small>
                                </a>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                {loading ? (
                                    <Spinner animation="border" role="status" />
                                ) : 'Sign In'}
                            </button>
                        </form>

                     <div className="d-flex mt-2 gap-2 justify-content-between">
                        <div className="d-flex mt-2 gap-2">
                            <small className="small mt-0">Don't have an account yet?</small>
                            <small><a className="text-brand mt-0" href="#" onClick={() => router.push('/register/')}
                                // style={{ textDecoration: 'none' , color: 'red'}}
                                >
                                Sign up
                            </a>
                            </small>
                        </div>
                        <div className="text-end mt-2">
                            <a href="#" onClick={() => router.push('/admin/login')}>
                                <small className="text-brand">Admin?</small>
                            </a>
                        </div>
                    </div>
                    </section>
                </div>
        </div>
</div>
    );
};

Login.propTypes = {
    searchParams: PropTypes.object,
};

export default Login;
