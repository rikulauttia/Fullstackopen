import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    newNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
});

export const { newNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (message, timeInSeconds) => {
  return (dispatch) => {
    dispatch(newNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeInSeconds * 1000);
  };
};

export default notificationSlice.reducer;
