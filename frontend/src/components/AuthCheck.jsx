import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAxiosInstance } from "./useAxiosInstance";
import { Navigate } from "react-router-dom";

const AuthCheck = ({ children }) => {
  const { token } = useAuth();
  const axiosInstance = useAxiosInstance();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await axiosInstance.get(""); // Adjust the endpoint as needed
          setUserInfo(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false); // Ensure this runs after fetch
    };

    fetchUserData();
  }, [token, axiosInstance]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Pass the user info to the children (Detail component)
  return React.cloneElement(children, { userInfo });
};
export default AuthCheck;
