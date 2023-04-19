import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Make API call to fetch list of courses
        const response = await axios.get('http://api.example.com/courses');
        if (response.status === 200) {
          // Set courses data in state
          setCourses(response.data);
          setIsLoading(false);
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      // Make API call to enroll in a course
      const response = await axios.post(
        `http://api.example.com/courses/${courseId}/enroll`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        }
      );
      if (response.status === 200) {
        // Handle enrollment success, e.g., show success message
        console.log(`Successfully enrolled in course with ID: ${courseId}`);
      } else {
        // Handle enrollment failure, e.g., show error message
        console.error(`Failed to enroll in course with ID: ${courseId}`);
      }
    } catch (error) {
      // Handle enrollment failure, e.g., show error message
      console.error(`Failed to enroll in course with ID: ${courseId}`);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching courses data.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Course List</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-900 text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Course Name</th>
            <th className="px-4 py-2">Enroll</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="text-gray-900">
              <td className="px-4 py-2">{course.id}</td>
              <td className="px-4 py-2">{course.name}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-blue-500 text-white font-semibold px-4 py-2 rounded"
                  onClick={() => handleEnroll(course.id)}
                >
                  Enroll
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseListPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableExample = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch course data from API endpoint
    axios
      .get('https://api.example.com/courses')
      .then((response) => {
        // Update the courses state with fetched data
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Course List</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-900 text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Course Name</th>
            <th className="px-4 py-2">Duration</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="text-gray-900">
              <td className="px-4 py-2">{course.id}</td>
              <td className="px-4 py-2">{course.name}</td>
              <td className="px-4 py-2">{course.duration}</td>
              <td className="px-4 py-2">
                {/* Render the enrol button for each course */}
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => enrolInCourse(course.id)}
                >
                  Enrol
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableExample;


const TableExample = () => {
  const data = [
    { id: 1, name: 'Course 1', duration: '4 weeks' },
    { id: 2, name: 'Course 2', duration: '6 weeks' },
    { id: 3, name: 'Course 3', duration: '8 weeks' },
    { id: 4, name: 'Course 4', duration: '10 weeks' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Course List</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-900 text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Course Name</th>
            <th className="px-4 py-2">Duration</th>
          </tr>
        </thead>
        <tbody>
          {data.map((course) => (
            <tr key={course.id} className="text-gray-900">
              <td className="px-4 py-2">{course.id}</td>
              <td className="px-4 py-2">{course.name}</td>
              <td className="px-4 py-2">{course.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableExample;