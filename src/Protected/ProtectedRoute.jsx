import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const getAuthToken = () => {
  return Cookies.get("accessToken");
};

export const getUserDetail = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();
    console.log(token, "token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return <Component />;
};
