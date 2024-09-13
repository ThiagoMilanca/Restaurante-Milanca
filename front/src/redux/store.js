import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    actualUser: userReducer,
  },
});

export default store;