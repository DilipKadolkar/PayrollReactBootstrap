// // src/context/AuthContext.js
// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // store user info
//   const [loading, setLoading] = useState(true);
  
//   // Get current user info from backend using cookie (accessToken)
//   console.log('user', user)
//   const fetchUser = async () => {
    
//     try {
//       const res = await fetch("http://localhost:8080/api/me", {
//         credentials: "include", // important to send cookies
//       });
//       if (res.ok) {
//         const data = await res.json();
       
//         setUser(data.data);
//       } else {
//         setUser(null);
//       }
//     } catch (err) {
//       setUser(null);
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const login = async (email, password) => {
//     const res = await fetch("http://localhost:8080/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ email, password }),
//     });
//     if (res.ok) {
//       await fetchUser(); // update user after login
//       return true;
//     } else {
//       const text = await res.text();
//       throw new Error(text);
//     }
//   };

//   const logout = async () => {
//     try {
//       const res = await fetch("http://localhost:8080/logoutme", {
//         method: "POST",
//         credentials: "include", // important
//       });
  
//       if (!res.ok) {
       
//         throw new Error("Logout failed");
//       }
//     } catch (err) {
//       console.error("Logout error:", err);
//     } finally {
//       setUser(null); // clear frontend state
//     }
//   };
  
  

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading , setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/me", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.data);
      } else if (res.status === 401 || res.status === 403) {
        // Access token expired, try refresh
        const refreshed = await refreshToken();
        if (refreshed) {
          await fetchUser(); // retry after refreshing
        } else {
          setUser(null);
        }
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

  // Refresh token function
  const refreshToken = async () => {
    try {
      const res = await fetch("http://localhost:8080/refresh-token", {
        method: "POST",
        credentials: "include", // send refresh token cookie
      });

      if (res.ok) {
        return true;
      } else {
        console.log("Refresh token failed");
        return false;
      }
    } catch (err) {
      console.error("Refresh token error:", err);
      return false;
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
      await fetchUser();
      return true;
    } else {
      const text = await res.text();
      throw new Error(text);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:8080/logoutme", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
