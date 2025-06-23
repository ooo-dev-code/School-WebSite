import { createContext, useEffect, useState } from "react";
import makeRequest from "../axios"; // adjust path if needed

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      return null;
    }
  });

  const auth = async (inputs, type) => {
    try {
      const res = await makeRequest.post(`/auth/${type}`, inputs, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
    } catch (error) {
      console.error("Auth error:", error.response?.data || error.message);
      throw error;
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, auth }}>
      {children}
    </AuthContext.Provider>
  );
};
