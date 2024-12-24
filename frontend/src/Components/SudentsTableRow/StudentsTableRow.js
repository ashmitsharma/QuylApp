import React, { useState } from 'react'
import './StudentTableRow.css';
import { formatDate, formatDateTime } from '../../utils/dateFormatter';
import courseImage from '../../Assets/courseImage.png';
import EditStudentModal from '../EditStudentModal/EditStudentModal';

function StudentsTableRow({ id, name, cohort, courses, dateJoined, lastLogin, status }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const studentData = { id, name, cohort, courses, dateJoined, lastLogin, status };

  return (
    <>
      <tr className="table-row hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200"
        onClick={() => setIsEditModalOpen(true)}
      >
        <td className="px-4 py-2 truncate max-w-xs">{name}</td>
        <td className="px-4 py-2 truncate max-w-xs">{cohort}</td>
        <td className="px-4 py-2 truncate max-w-xs">
          {courses.map((course, index) => (
            <span key={index}>
              <span><img src={courseImage} alt='Course Icon' className='inline-block course-image dark:opacity-80'></img></span>
              <span
                className="inline-block course-box px-2 py-1 rounded mr-2 dark:bg-gray-600 dark:text-gray-200"
              >
                {course}
              </span>
            </span>
          ))}
        </td>
        <td className="px-4 py-2 truncate max-w-xs">{formatDate(dateJoined)}</td>
        <td className="px-4 py-2 truncate max-w-xs">{formatDateTime(lastLogin)}</td>
        <td className="px-4 py-2 flex justify-center items-center truncate max-w-xs">
          <span
            className={`inline-block w-3 h-3 rounded-full ${status === "active" ? "bg-green-500" : "bg-red-500"}`}
          />
        </td>
      </tr>
      <EditStudentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        studentData={studentData}
      />
    </>
  )
}

export default StudentsTableRow