// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store user info
  const [loading, setLoading] = useState(true);
  
  // Get current user info from backend using cookie (accessToken)
  console.log('user', user)
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/me", {
        credentials: "include", // important to send cookies
      });
      if (res.ok) {
        const data = await res.json();
        
        setUser(data.data);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      await fetchUser(); // update user after login
      return true;
    } else {
      const text = await res.text();
      throw new Error(text);
    }
  };

  const logout = async () => {
    // Optionally, call a /logout endpoint to clear cookies
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
