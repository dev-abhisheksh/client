import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser as apiLogin, logoutUser as apiLogout, getMe as apiGetMe } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check active session on initial mount
  useEffect(() => {
    let isMounted = true;
    apiGetMe()
      .then((res) => {
        if (isMounted && res.data?.success && res.data?.user) {
          setUser(res.data.user);
        }
      })
      .catch(() => {
        if (isMounted) setUser(null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (credentials) => {
    const res = await apiLogin(credentials);
    if (res.data?.success && res.data?.user) {
      setUser(res.data.user);
    }
    return res.data;
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.warn("Logout error:", err);
    } finally {
      setUser(null);
    }
  };

  const isAdmin = !!(user && (user.role === "admin" || user.role === "superadmin"));

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
