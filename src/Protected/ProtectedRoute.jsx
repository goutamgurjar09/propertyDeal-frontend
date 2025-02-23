import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const getAuthToken = () => {
  return Cookies.get("authToken");
};
export const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken(); // Ensure the correct token key
    if (!token) {
      navigate("/login"); // Redirect to login if no token found
    }
  }, [navigate]); // Add `navigate` as dependency

  return <Component />;
};
