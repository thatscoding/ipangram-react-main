import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearUserInfo = () => {
    localStorage.removeItem("user");
    setUserInfo(null);
  };

  const value = {
    isLoading,
    userInfo,
    error,
    setUserInfo,
    clearUserInfo,
    setIsLoading,
    setError,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserInfo = () => {
  return useContext(UserContext);
};
