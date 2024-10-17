"use client"

import { createContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const login = async (username, password) => {
        try {

            
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            

            // use env for the API URL: process.env.API_URL
            const apiUrl = `${process.env.NEXT_PUBLIC_FASTAPI_API_URL}/auth/token`;

            const response = await axios.post(apiUrl, formData, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            });


            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
            localStorage.setItem('token', response.data.access_token);
            setUser(response.data);
            localStorage.setItem('user', username);

            if (username === 'admin') {
                router.push('/admin/');
            }else{
                router.push('/');
            }
        } catch (error) {
            console.log('Login Failed:', error);
        }
    };

    const logout = () => {
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login')
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthContext;