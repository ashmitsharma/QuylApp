import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setStudents } from './redux/slices/studentSlice';
import { setCourses, setAcademicYears } from './redux/slices/apiDataSlice';
import Sidebar from './Components/Sidebar/Sidebar';
import Navbar from "./Components/Navbar/Navbar";
import Students from "./Screens/Students/Students";
import TopMenu from './Components/TopMenu/TopMenu';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/students`);
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();

        // Extracting unique courses and years from the response
        const uniqueCourses = [...new Set(data.students.flatMap(student => student.courses))];
        const uniqueYears = [...new Set(data.students.map(student => student.cohort))];

        dispatch(setStudents({
          students: data.students || [],
          courses: uniqueCourses || [],
          years: uniqueYears || []
        }));
      } catch (error) {
        console.error('Failed to fetch students data:', error);
        setError(error.message);
        // Set empty arrays in case of error to prevent undefined errors
        dispatch(setStudents({
          students: [],
          courses: [],
          years: []
        }));
      } finally {
        setLoading(false);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/courses`);
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        dispatch(setCourses(data || []));
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setError(error.message);
        dispatch(setCourses([]));
      } finally {
        setLoading(false);
      }
    };

    const fetchAcademicYears = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/academicyears`);
        if (!response.ok) {
          throw new Error('Failed to fetch academic years');
        }
        const data = await response.json();
        dispatch(setAcademicYears(data || []));
      } catch (error) {
        console.error('Failed to fetch academic years:', error);
        setError(error.message);
        dispatch(setAcademicYears([]));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchCourses();
    fetchAcademicYears();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error:', error);
  }

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for large screens */}
      <div className="hidden md:grid grid-cols-[248px_1fr] h-full gap-4">
        <Sidebar />
        <div className="flex flex-col">
          <Navbar />
          <div className="pr-6 overflow-y-auto">
            <Students />
          </div>
        </div>
      </div>
      {/* Top Menu for small screens */}
      <div className="md:hidden">
        <TopMenu />
        <div className="mt-4">
          <Navbar />
          <Students />
        </div>
      </div>
    </div>
  );
}

export default App;