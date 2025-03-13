import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedRole = localStorage.getItem("role");
      setRole(storedRole);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (userRole) => {
    localStorage.setItem("role", userRole);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem("role");
    setRole(null);
  };

  return <AuthContext.Provider value={{ role, login, logout }}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
