import React, { useEffect, useState } from 'react';
import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(!!user)

  useEffect(() => {
    setIsLogin(!!user);
  }, [user]);

  const value = { user, setUser, isLogin, setIsLogin };

  return (
    <AuthContext.Provider value={value} > {props.children}</AuthContext.Provider >
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}