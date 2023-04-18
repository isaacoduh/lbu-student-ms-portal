import Link from "next/link";
import Head from 'next/head';

import { useState } from "react";
import { useRouter } from "next/router";
import { toast,Toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'


export default function login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const router = useRouter();

    function login(event){
        event.preventDefault();

        console.log(email);
        console.log(password);

        axios.post(`http://127.0.0.1:8070/api/v1/auth/login`,{
            email: email,
            password:password
        }).then((response) => {
            console.log(response);
            toast.success(`Login Successful`, {
                position: 'top-right',
                autoClose: 1000,
                pauseOnHover: false
            })
            localStorage.setItem('token', response.data.token)
            router.push('/dashboard')
        }).catch(error => {
            toast.error(`error occured!`, {
                position: 'top-right',
                autoClose: 1000,
                pauseOnHover: false,
              })
        })
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white w-full max-w-md p-8 rounded-md shadow-md">
            <h1 className="text-2xl font-semibold text-gray-500 mb-6">Login</h1>
            <ToastContainer/>
            <form onSubmit={login}
            className="bg-white px-1 py-1 rounded-xl text-black w-full">
                <div className="mb-4">
                    <label  className="block text-gray-600 text-sm mb-2">Email</label>
                    <input type="email" id="email" name="email"
                        className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        placeholder="Email" required onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm mb-2">Password</label>
                    <input type="password" id="password" name="password"
                        className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                </div>
                <button
                    type="submit"
                    className="w-full text-center font-semibold py-2 rounded bg-gray-500 text-white focus:outline-none my-2"
                >
                    Log In
                </button>
            </form>
            <div className="text-slate-600 mt-6">
                Dont have an account?
                <Link href="/register" className="p-2 font-bold font-sans border-b-2 border-double 
            border-transparent hover:border-current cursor-pointer select-none">
                    
                    Register
                    
                </Link>
            </div>
            </div>
        </div>
    )
}