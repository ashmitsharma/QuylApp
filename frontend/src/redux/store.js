import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './slices/studentSlice';
import apiDataReducer from './slices/apiDataSlice';

export const store = configureStore({
  reducer: {
    student: studentReducer,
    apiData: apiDataReducer,
  },
});
