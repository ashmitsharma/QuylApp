import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [], // Student data for table rows
  dropdowns: {
    courses: [],
    years: [],
  },
  filters: {
    course: '',
    year: '',
    search: '',
  },
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudents: (state, action) => {
      const { students, courses, years } = action.payload;
      state.students = students;
      state.dropdowns.courses = courses;
      state.dropdowns.years = years;
    },
    setFilter: (state, action) => {
      const { filterName, filterValue } = action.payload;
      state.filters[filterName] = filterValue;
    },
  },
});

// Add selector here
export const selectFilteredStudents = (state) => {
  const { students, filters } = state.student;
  
  return students.filter((student) => {
    const matchesCourse = filters.course 
      ? student.courses.includes(filters.course) 
      : true;
    const matchesYear = filters.year 
      ? student.cohort === filters.year 
      : true;
    const matchesSearch = filters.search
      ? student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        student.courses.some((course) =>
          course.toLowerCase().includes(filters.search.toLowerCase())
        )
      : true;

    return matchesCourse && matchesYear && matchesSearch;
  });
};

export const { setStudents, setFilter } = studentSlice.actions;
export default studentSlice.reducer;