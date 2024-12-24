import React from 'react';
import StudentsTableRow from '../SudentsTableRow/StudentsTableRow';
import './StudentTable.css';
import { useSelector } from 'react-redux';
import { selectFilteredStudents } from '../../redux/slices/studentSlice';

function StudentsTable() {
  const filteredStudents = useSelector(selectFilteredStudents);

  if (!filteredStudents || filteredStudents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white dark:bg-gray-800 rounded-lg shadow">
        <svg 
          className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 14h.01M12 16h.01M12 18h.01M12 20h.01M12 22h.01"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No Students Found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
          There are no students to display. This could be due to server issues or no data matching your current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-700">
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Student Name</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Cohort</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Courses</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Date Joined</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Last Login</th>
            <th className="px-4 py-2 flex justify-center items-center text-gray-700 dark:text-gray-200">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
          {filteredStudents.map((student) => (
            <StudentsTableRow key={student.id} {...student} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentsTable;