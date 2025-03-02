import React, { createContext, useState, useEffect } from "react";
import AuthController from "../controllers/AuthController";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(AuthController.getCurrentUser());

  useEffect(() => {
    setUser(AuthController.getCurrentUser());
  }, []);

  const login = (username, password) => {
    const result = AuthController.login(username, password);
    if (result.success) setUser(AuthController.getCurrentUser());
    return result;
  };

  const logout = () => {
    AuthController.logout();
    setUser(null);
  };

  const register = (username, password) => {
    return AuthController.register(username, password);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
