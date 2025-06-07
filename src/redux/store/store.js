import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
import authReducer from "../slices/authSlice";
import propertyReducer from "../slices/propertySlice";
import cityReducer from "../slices/citySlice";
import bookingReducer from "../slices/bookingSlice";
import EnquiryFormReducer from "../slices/enquirySlices";
import categoryReducer from "../slices/categorySlice";
import viewersReducer from "../slices/trackViewers";
import messageReducer from "../slices/messageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    property: propertyReducer,
    city: cityReducer,
    booking: bookingReducer,
    enquiry: EnquiryFormReducer,
    category: categoryReducer,
    viewers: viewersReducer,
    chat: messageReducer,
  },
});

export default store;
