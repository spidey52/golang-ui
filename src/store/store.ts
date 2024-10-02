import { configureStore } from "@reduxjs/toolkit";
import templateReducer from "./slices/template.slice";
import themeReducer from "./slices/theme.slice";

const store = configureStore({
 reducer: {
  templateReducer: templateReducer,
  themeReducer: themeReducer,
 },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
