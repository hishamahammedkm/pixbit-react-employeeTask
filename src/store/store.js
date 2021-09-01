import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import emploeeSlice from './slices/employeeSlice'

const store = configureStore({
  reducer: {auth: authReducer,employee:emploeeSlice}
});




export default store;