import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {getUserDetail } from "../redux/slices/authUtlis"; 

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUserDetail();
    console.log("User:", user);
    if (!user.accessToken || !user || user.role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  return children;
};

export default ProtectedRoute;
