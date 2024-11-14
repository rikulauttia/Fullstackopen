import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterChanger(state, action) {
      return action.payload;
    },
  },
});

export const { filterChanger } = filterSlice.actions;
export default filterSlice.reducer;
