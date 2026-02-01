import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(sessionStorage.getItem("CravingUser"));

  const [user, setUser] = useState(storedUser);
  const [role, setRole] = useState(storedUser?.role || "");
  const [isLogin, setIsLogin] = useState(!!storedUser);

  const logout = () => {
    setUser(null);
    setRole("");
    setIsLogin(false);
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        role,
        setRole,
        isLogin,
        setIsLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
