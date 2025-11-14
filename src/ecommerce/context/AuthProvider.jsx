import { createContext, useContext, useEffect, useState } from "react";
import instance from "../config/axiosConfig";

const authContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null); 

  async function isUserLoggedIn() {
    try {
      const response = await instance.get("/auth/authCheck", {
        withCredentials: true,
      });
      console.log(response.data);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      setIsLoggedIn(false);
      return false;
    }
  }

  const checkAuthStatus = isUserLoggedIn;

  function loginSuccess() {
    setIsLoggedIn(true);
  }

  async function Logout() {
    try {
      await instance.post("/auth/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  return (
    <authContext.Provider
      value={{
        isLoggedIn,
        isUserLoggedIn,
        checkAuthStatus,
        loginSuccess,
        Logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

export default AuthProvider;
