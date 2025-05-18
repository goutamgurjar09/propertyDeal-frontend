import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
import authReducer from "../slices/authSlice";
import propertyReducer from "../slices/propertySlice";
import cityReducer from "../slices/citySlice";
import bookingReducer from "../slices/bookingSlice";
import EnquiryFormReducer from "../slices/enquirySlices";
const store = configureStore({
  reducer: {
    auth: authReducer,
    property: propertyReducer,
    city: cityReducer,
    booking: bookingReducer,
    enquiry: EnquiryFormReducer,

  },
});

export default store;
