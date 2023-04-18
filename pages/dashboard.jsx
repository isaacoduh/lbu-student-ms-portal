import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast,Toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'



export default function Dashboard(){
    const [user, setUser] = useState('');
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log(token);

        axios.get(`http://127.0.0.1:8070/api/v1/student/profile`,{
            headers: {
                'content-type': 'application/json',
                Authorization: 'Bearer ' + token
            },
        },{
            withCredentials: false
        }).then(response => {
            console.log(response)
            setUser(response.data)
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

    const handleLogout = () => {
        console.log('logout clicked!');
        // Remove token from local storage
        localStorage.removeItem('token');

        // Redirect to login route
        router.push('/login');
    }
    return (
        
        <div className="bg-gray-100">
          <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-6">
              <h1 className="text-2xl text-slate-500 font-semibold">User Dashboard</h1>
            </div>
          </header>
          <ToastContainer/>
          
          <main className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-4 text-slate-100">Profile Information</h2>
                <div className="flex items-center mb-4">
                  <img
                    src="https://via.placeholder.com/64"
                    alt="Profile Picture"
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl text-gray-700 font-semibold">{user.firstName} {user.lastName}</h3>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="border-t border-gray-300 pt-4">
                  <h4 className="text-lg font-semibold mb-2">Other Information</h4>
                  <p className="text-gray-600">StudentId: {user.studentId}</p>
                  <p className="text-gray-600">Address: 1234 Main Street, Springfield, IL 62704</p>
                </div>
                {/* <div className="border-t border-gray-300 pt-4">
                  <h4 className="text-lg font-semibold mb-2">Contact Information</h4>
                  <p className="text-gray-600">Phone: +1 (123) 456-7890</p>
                  <p className="text-gray-600">Address: 1234 Main Street, Springfield, IL 62704</p>
                </div> */}
                {/* <div className="border-t border-gray-300 pt-4">
                  <h4 className="text-lg font-semibold mb-2">Personal Information</h4>
                  <p className="text-gray-600">Date of Birth: January 1, 1980</p>
                  <p className="text-gray-600">Gender: Male</p>
                </div> */}
                {/* <a href="#" className="mt-6 text-indigo-500 hover:text-indigo-600">
                  Edit Profile
                </a> */}
                <Link href="/editprofile" className="p-2 font-bold font-sans border-b-2 border-double 
            border-transparent hover:border-current cursor-pointer select-none text-slate-500">
                    
                    Edit Profile
                    
                </Link>
                <button
      className="bg-red-500 hover:bg-red-600 ml-5 text-white font-semibold py-2 px-4 rounded"
      onClick={handleLogout}
    >
      Logout
    </button>

              </div>
              {/* Other dashboard sections */}
            </div>
          </main>
          <footer className="bg-white py-4">
            <div className="container mx-auto px-4">
              <p className="text-center text-gray-600">© 2023 Student Portal. All rights reserved.</p>
            </div>
          </footer>
        </div>
      );
}