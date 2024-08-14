import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
   
    const role = Cookies.get('userRole');
    const auth = Cookies.get('isAuthenticated') === 'true';

    if (role && auth) {
      setUserRole(role);
      setIsAuthenticated(auth);
    }
  }, []);

  const login = (role) => {
    Cookies.set('userRole', role);
    Cookies.set('isAuthenticated', 'true');
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('userRole');
    Cookies.remove('isAuthenticated');
    setUserRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ userRole, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
