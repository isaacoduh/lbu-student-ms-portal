import Link from "next/link";
import Head from 'next/head';
import { useRouter } from "next/router";
import { useState } from "react";
import { toast,Toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    function register(event){
        event.preventDefault();
        axios.post(`http://127.0.0.1:4100/api/v1/auth/register`,{
            firstName: firstName,
            lastName: lastName,
            email,
            password
        }).then((response) => {
            console.log(response);
            toast.success(`Registration Complete`, {
                position: 'top-right',
                autoClose: 1000,
                pauseOnHover: false
            })
            router.push('/login')
        }).catch(error => {
            toast.error(`error occured!`, {
                position: 'top-right',
                autoClose: 1000,
                pauseOnHover: false,
              })
              
        })

        
    }

    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white w-full max-w-md p-8 rounded-md shadow-md">
                <h1 className="text-2xl text-gray-400 font-semibold mb-6">Create Account</h1>
                <ToastContainer/>
                <form onSubmit={register}
          className="bg-white px-1 py-1 rounded-xl text-black w-full">
            {/* <div className="mb-4">
                            <label className="block text-gray-600 text-sm mb-2">Student ID</label>
                            <input type="text" id="studentId" name="studentId"
                                className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                placeholder="" required onChange={e => setStudentId(e.target.value)} />
                        </div> */}
                    <div className="mb-4">
                        <label  className="block text-gray-600 text-sm mb-2">First Name</label>
                        <input
                                type="text"
                                className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                name="firstName"
                                // placeholder="First Name"
                                required
                                onChange={e => setFirstName(e.target.value)}
                            />
                    </div>
                    <div className="mb-4">
                            <label  className="block text-gray-600 text-sm mb-2">Last Name</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                name="lastName"
                                // placeholder="Last Name"
                                required
                                onChange={e => setLastName(e.target.value)}
                            />
                               
                        </div>
                        <div className="mb-4">
                            <label  className="block text-gray-600 text-sm mb-2">Email</label>
                            <input type="email" id="email" name="email"
                                className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                placeholder="" required onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label  className="block text-gray-600 text-sm mb-2">Password</label>
                            <input type="password" id="password" name="password"
                                className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                placeholder="" required onChange={e => setPassword(e.target.value)} />
                        </div>
                        
                        <button type="submit"
                            className="w-full text-center font-semibold py-2 rounded bg-gray-500 text-white focus:outline-none my-2">Create Account</button>
                </form>
                <div className="text-slate-600 mt-6">
                Already have an account?
                <Link href="/login" className="p-2 font-bold font-sans border-b-2 border-double 
            border-transparent hover:border-current cursor-pointer select-none">
                    
                    Login
                    
                </Link>
            </div>
            </div>
        </div>
    )
}