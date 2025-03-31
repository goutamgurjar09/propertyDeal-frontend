import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import propertyReducer from "../slices/propertySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    property: propertyReducer,
  },
});

export default store;
