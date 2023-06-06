import React, { useState } from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const logout = () => {
    setUserLoggedIn(false);
    setUser(null);
  };

  const setUserContext = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ userLoggedIn, setUserLoggedIn, logout, user, setUser: setUserContext }}>
      {children}
    </AuthContext.Provider>
  );
};


