import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: {},
  userAppointments: []
};

export const userSlice = createSlice({
  name: "actualUser",
  initialState,
  reducers: {
    addUserId: (state, action) => {
      state.userId.user = action.payload;
    },
    allAppointments: (state, action) => {
      state.userAppointments = action.payload
      
    },
    addAppointment: (state, action) => {
      state.userAppointments.push(action.payload)
    }
  },
});

export const { addUserId, allAppointments, addAppointment } = userSlice.actions;

export default userSlice.reducer;