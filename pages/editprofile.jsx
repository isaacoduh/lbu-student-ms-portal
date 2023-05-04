import axios from 'axios';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';
import { toast,Toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


export default function EditProfile(){
    const [profileData, setProfileData] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
    });
    const handleChange = (e) => {
        const  {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')
        console.log(token);
        console.log('Form Data:', formData);
        axios.put(`http://127.0.0.1:4100/api/v1/student/profile/update`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        .then((response) => {
            console.log(response);
            toast.success(`Profile update successful`, {
                position: 'top-right',
                autoClose: 1000,
                pauseOnHover: false
            })
            router.push('/dashboard')
        }).catch(error => {
            toast.error(`error occured!`, {
                position: 'top-right',
                autoClose: 1000,
                pauseOnHover: false,
              })
        })
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log(token);
        console.log('loaded!')
        axios.get(`http://127.0.0.1:4100/api/v1/student/profile`,{
            headers: {
                'content-type': 'application/json',
                Authorization: 'Bearer ' + token
            },
        },{
            withCredentials: false
        }).then(response => {
            console.log(response)
            setProfileData(response.data)
            setFormData({
                firstName: response.data.firstName,
                lastName: response.data.lastName
            })
        }).catch(error => {
            console.log(error.response.status)
            toast.error(`Authentication Failed or Something went wrong!`,{
                position: 'top-right',
                autoClose: 1000,
                pauseOnHover: false
            })
            if(error.response.status === 403){
                console.log('Yuck')
                toast.error(`Authentication Failed!`,{
                    position: 'top-right',
                    autoClose: 1000,
                    pauseOnHover: false
                })
                localStorage.setItem('token', '')
              router.push('/login')
            }
        })
        
    },[])
    return (
            <div className='bg-gray-100 flex items-center justify-center h-screen text-slate-400'>
              <div className='bg-white w-full max-w-md p-8 rounded-md shadown-md'>
                
                <h1 className="text-2xl text-gray-400 font-semibold mb-6">Edit Profile</h1>
                <form className='"bg-white px-1 py-1 rounded-xl text-black w-full' onSubmit={handleSubmit}>
                <ToastContainer/>
                    <label htmlFor="firstName" className="block text-gray-600 text-sm mb-2">First Name</label>
                    <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mb-4 w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-"
                    />
                    <label htmlFor="lastName" className="block text-gray-600 text-sm mb-2">Last Name</label>
                    <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mb-4 w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-"
                    />
                    {/* Render other form fields here */}
                    <button type="submit" className="w-1/4 text-center font-semibold py-2 rounded bg-gray-500 text-white focus:outline-none my-2">Save</button>
                </form>
              </div>
            </div>
    )
}