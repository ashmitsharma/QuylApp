import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStudents } from '../../redux/slices/studentSlice';

function EditStudentModal({ isOpen, onClose, studentData }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(studentData);
    const [error, setError] = useState('');

    // Get courses and years from Redux store
    const coursesArray = useSelector((state) => state.apiData.courses);
    const yearsArray = useSelector((state) => state.apiData.academicYears);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCoursesChange = (e) => {
        const selectedCourses = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData((prev) => ({ ...prev, courses: selectedCourses }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/students/${studentData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update student');
            }

            // Fetch updated student list
            const updatedStudentsResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/students`);
            const data = await updatedStudentsResponse.json();

            // Extract unique courses and years
            const uniqueCourses = [...new Set(data.students.flatMap((student) => student.courses))];
            const uniqueYears = [...new Set(data.students.map((student) => student.cohort))];

            // Update Redux store with the correct structure
            dispatch(setStudents({
                students: data.students,
                courses: uniqueCourses,
                years: uniqueYears,
            }));

            onClose();
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to update student. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/students/${studentData.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete student');
            }

            // Fetch updated student list
            const updatedStudentsResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/students`);
            const data = await updatedStudentsResponse.json();

            // Extract unique courses and years
            const uniqueCourses = [...new Set(data.students.flatMap((student) => student.courses))];
            const uniqueYears = [...new Set(data.students.map((student) => student.cohort))];

            // Update Redux store with the correct structure
            dispatch(setStudents({
                students: data.students,
                courses: uniqueCourses,
                years: uniqueYears,
            }));

            onClose();
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to delete student. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Edit Student</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        ✕
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleUpdate} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                        />
                    </div>

                    {/* Cohort */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Cohort Year</label>
                        <select
                            name="cohort"
                            value={formData.cohort}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                        >
                            <option value="">Select Year</option>
                            {yearsArray.map((year) => (
                                <option key={year} value={year} className="dark:bg-gray-700">
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Courses */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Courses</label>
                        <select
                            multiple
                            name="courses"
                            value={formData.courses}
                            onChange={handleCoursesChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                        >
                            {coursesArray.map((course) => (
                                <option key={course} value={course} className="dark:bg-gray-700">
                                    {course}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                            Hold Ctrl/Cmd to select multiple courses
                        </p>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditStudentModal;
