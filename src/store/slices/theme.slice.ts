import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
 mode: "light" | "dark";
};

const initialState: InitialState = {
 mode: localStorage.getItem("theme") === "dark" ? "dark" : "light",
};

const themeSlice = createSlice({
 name: "theme",
 initialState: initialState,
 reducers: {
  toggleTheme: (state) => {
   state.mode = state.mode === "light" ? "dark" : "light";
   localStorage.setItem("theme", state.mode);
  },
 },
});

const themeReducer = themeSlice.reducer;

export const { toggleTheme } = themeSlice.actions;

export default themeReducer;
