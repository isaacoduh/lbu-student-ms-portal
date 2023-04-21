import React, { use, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import { useRouter } from "next/router";


import { toast,Toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'



const ViewCourses = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const router = useRouter();

    const goBack = () => {
        router.back();
      };

    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log(token);

        axios.get(`http://127.0.0.1:8070/api/v1/courses`,{
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        },{
            withCredentials: false
        }).then(response => {
            console.log(response)
            setCourses(response.data)
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
        const tempCourses = [
            {id: 1, courseId: 'COMP 720', courseTitle: "Brook Main", courseTerm: "WIN"},
            {id: 2, courseId: 'COMP 721', courseTitle: "Network Management", courseTerm: "WIN"}
          ];
        setCourses(tempCourses);
        console.log(tempCourses);
    },[]);

  // Array of users data
  const users = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
    { id: 3, name: "Tom Johnson", age: 35 },
  ];

  

  const handleEnroll = async (courseId) => {
    console.log(courseId);
    // localhost:8070/api/v1/student/enroll/6
    const token = localStorage.getItem('token');
    console.log(token)
    await axios.post(`http://127.0.0.1:8070/api/v1/student/enroll`,{
        id: courseId
    }, {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    },{
        withCredentials: false
    }).then((response) => {
        console.log(response);
        toast.success(`Enrollment Successful!`,{
            position: 'top-right',
            autoClose: 1000,
            pauseOnHover: false
        })
        router.push('/dashboard')
    }).catch(error => {
        console.log(error);
        // console.log(error.response.status)
            // toast.error(`Authentication Failed or Something went wrong!`,{
            //     position: 'top-right',
            //     autoClose: 1000,
            //     pauseOnHover: false
            // })
            // if(error.response.status === 403){
            //     console.log('Yuck')
            //     toast.error(`Authentication Failed!`,{
            //         position: 'top-right',
            //         autoClose: 1000,
            //         pauseOnHover: false
            //     })
            //     localStorage.setItem('token', '')
            //   router.push('/login')}
    })

  }

  return (
    <div className="bg-gray-100 flex items-start justify-center h-screen text-slate-400">
       <ToastContainer/>
        <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Course List</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
            <tr className="bg-gray-900 text-white">
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2">Course ID</th>
                <th className="px-4 py-2">Course Title</th>
                <th className="px-4 py-2">Course Term</th>
                <th className="px-4 py-2">Course Fee</th>
                <th className="px-4 py-2">Enroll</th>
            </tr>
        </thead>
        <tbody>
            {courses.map((course) => (
                <tr key={course.id} className="text-gray-900">
                    <td className="px-4 py-2">{course.id}</td>
                    <td className="px-4 py-2">{course.courseId}</td>
                    <td className="px-4 py-2">{course.courseTitle}</td>
                    <td className="px-4 py-2">{course.courseTerm}</td>
                    <td className="px-4 py-2">{course.courseFee}</td>
                    <td className="px-4 py-2">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded btn-xs"
                            onClick={() => handleEnroll(course.id)}
                            >
                            Enrol
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
      <div>
      <button onClick={goBack}>Go Back</button>
      </div>
    </div>
    </div>
    
  );
};

export default ViewCourses;