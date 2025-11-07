import React, { useState, useEffect } from 'react';
import api from '../api/api'; 
import { AuthContext } from './auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('botflix_token');
    const userData = localStorage.getItem('botflix_user');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error("Erro ao restaurar dados do usuário:", error);
        localStorage.clear(); 
      }
    }
    setLoading(false);
  }, []); 

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user: userData } = response.data;
      
      setUser(userData);
      localStorage.setItem('botflix_token', token);
      localStorage.setItem('botflix_user', JSON.stringify(userData));

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return true; 
    } catch (error) {
      console.error('Falha no Login:', error.response || error);
      logout(); 
      throw error; 
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('botflix_token');
    localStorage.removeItem('botflix_user');
    delete api.defaults.headers.common['Authorization']; 
  };
  
  const contextValue = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };

  if (loading) {
    return null; 
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};