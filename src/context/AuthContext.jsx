import React, { createContext, useContext } from 'react';
import { useCurrentUser } from '../hooks/auth/useCurrentUser';
import { useLogin } from '../hooks/auth/useLogin';
import { useLogout } from '../hooks/auth/useLogout';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data, isLoading } = useCurrentUser();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  const user = data?.data?.user || null;
  const isAdmin = !!(user && (user.role === 'admin' || user.role === 'superadmin'));

  const login = async (credentials) => {
    const res = await loginMutation.mutateAsync(credentials);
    if (res?.data?.accessToken) {
      localStorage.setItem('accessToken', res.data.accessToken);
    }
    return res.data;
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } finally {
      localStorage.removeItem('accessToken');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading: isLoading,
        isLoggingIn: loginMutation.isPending,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};