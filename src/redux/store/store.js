import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
import authReducer from "../slices/authSlice";
import propertyReducer from "../slices/propertySlice";
import cityReducer from "../slices/citySlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    property: propertyReducer,
    city: cityReducer,
  },
});

export default store;
