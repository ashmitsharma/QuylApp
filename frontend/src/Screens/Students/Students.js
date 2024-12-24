import React, {useState} from 'react';
import './students.css';
import PlusIcon from '../../Assets/Plus.png';
import StudentsTable from '../../Components/StudentsTable/StudentsTable';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/slices/studentSlice';
import AddStudentModal from '../../Components/AddStudentModal/AddStudentModal';

function Students() {
  const dispatch = useDispatch();
  const dropdowns = useSelector((state) => state.student.dropdowns);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 space-y-6 bg-white dark:bg-gray-800 rounded">
      {/* Upper Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
        {/* Left Section (Dropdowns) */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Dropdown 1 */}
          <select 
            className="year-drop-down drop-down items-center bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" 
            onChange={(e) => dispatch(setFilter({ filterName: 'year', filterValue: e.target.value }))}
          >
            <option value="">All Years</option>
            {dropdowns.years.map((year) => (
              <option key={year} value={year} className="dark:bg-gray-700">
                {year}
              </option>
            ))}
          </select>
          {/* Dropdown 2 */}
          <select 
            className="course-drop-down drop-down items-center bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" 
            onChange={(e) => dispatch(setFilter({ filterName: 'course', filterValue: e.target.value }))}
          >
            <option value="">All Courses</option>
            {dropdowns.courses && dropdowns.courses.map((course) => (
              <option key={course} value={course} className="dark:bg-gray-700">
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* Right Section (Button) */}
        <div className="flex justify-end">
          <button className="flex add-student-button dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white" onClick={() => setIsModalOpen(true)}>
            <img className="dark:opacity-90" src={PlusIcon} alt="Plus Icon" /> Add New Student
          </button>
        </div>
      </div>

      {/* Lower Section (Table) */}
      <div className="bg-white dark:bg-gray-800 rounded overflow-hidden">
        <StudentsTable />
      </div>

      {/* Add Student Modal */}
      <AddStudentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Students