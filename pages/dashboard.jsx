import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast,Toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Badge = ({ hasOutstandingBalance }) => {
    return (<span className={`text-500`}>{hasOutstandingBalance === true ? 'Ineligible' : 'Eligible'}</span>);
    // const badgeClasses = status
    //   ? 'bg-green-500 text-white'
    //   : 'bg-red-500 text-white'; // Define the badge classes based on the boolean status
  
    // return (
    //   <span className={`inline-block py-1 px-3 rounded-full text-sm ${badgeClasses}`}>
    //     {status ? 'Eligible' : 'Ineligibile'}
    //   </span>
    // );
  };

export default function Dashboard(){
    const [user, setUser] = useState('');
    const [myCourses, setMyCourses] = useState([]);
    const [hasOutstandingBalance, setHasOutstandingBalance] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log(token);

        const fetchMyGraduationStatus = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:4100/api/v1/student/status`, {
                    headers: {
                        'content-type': 'application/json',
                        Authorization: 'Bearer ' + token
                    }
                });

                
                setHasOutstandingBalance(response.data);
            } catch (error) {
                
            }
        }

        const fetchMyCourses = async() => {
            try {
                const response = await axios.get(`http://127.0.0.1:4100/api/v1/student/enrollments`, {
                    headers: {
                        'content-type': 'application/json',
                        Authorization: 'Bearer ' + token
                    }
                });
                console.log(response);
                setMyCourses(response.data.courses);
                console.log(response.data.courses);
            } catch (error) {
                console.log(error);   
            }
        }

        axios.get(`http://127.0.0.1:4100/api/v1/student/profile`,{
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
        });
        fetchMyCourses();
        fetchMyGraduationStatus();
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
                    <p className="text-gray-400">Graduation Status: <Badge hasOutstandingBalance={hasOutstandingBalance}/></p>
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
              <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-4 text-slate-500">Course Information</h2>
                <Link href="/viewcourses" className="p-2 font-bold font-sans border-b-2 border-double 
            border-transparent hover:border-current cursor-pointer select-none text-slate-500">
                    
                    View All Available Courses
                    
                </Link>
                <hr />
                <div>
                    {myCourses.length > 0 ? (
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-900 text-white">
                                    <td className="text-center">Course Code</td>
                                    <th className="text-center">Course Title</th>
                                    <th className="text-center">Course Term</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myCourses.map((course,index) => (
                                    <tr key={index} className="text-gray-900">
                                        <td className="p-4">{course.courseId}</td>
                                        <td className="p-4">{course.courseTitle}</td>
                                        <td className="p-4">{course.courseTerm}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ):(<p className="text-gray-500">No courses enrolled yet!</p>)}
                </div>
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