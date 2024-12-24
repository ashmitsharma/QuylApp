import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [], // Array to store course names
  academicYears: [], // Array to store academic years
};

const apiDataSlice = createSlice({
  name: 'apiData',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      // Extract names from the response
      state.courses = action.payload.map((course) => course.name);
    },
    setAcademicYears: (state, action) => {
      state.academicYears = action.payload.map((year) => year.name);
    },
  },
});

export const { setCourses, setAcademicYears } = apiDataSlice.actions;
export default apiDataSlice.reducer;
