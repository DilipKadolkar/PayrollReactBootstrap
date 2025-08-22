// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [roles, setRoles] = useState(
    JSON.parse(localStorage.getItem("roles")) || []
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("roles", JSON.stringify(roles));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("roles");
    }
  }, [token, roles]);

  const login = (jwtToken) => {
    const payload = JSON.parse(atob(jwtToken.split(".")[1]));
    setToken(jwtToken);
    setRoles(payload.roles || []);
  };

  const logout = () => {
    setToken(null);
    setRoles([]);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
