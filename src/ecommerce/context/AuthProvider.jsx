import { createContext, useContext, useEffect, useState } from "react";
import { authentication } from "../pages/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import instance from "../config/axiosConfig";

const authContext = createContext();

export function useAuth() {
  return useContext(authContext);
}

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  function loginSuccess(userObj = null) {
    setIsLoggedIn(true);
    setUser(userObj);
  }

  async function Logout() {
    try { await signOut(authentication); } catch {}
    try { await instance.post("/auth/logout", {}, { withCredentials: true }); } catch {}
    setIsLoggedIn(false);
    setUser(null);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (userObj) => {
      if (userObj) {
        setIsLoggedIn(true);
        setUser({
          displayName: userObj.displayName,
          email: userObj.email,
          uid: userObj.uid,
        });
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <authContext.Provider value={{ isLoggedIn, user, loginSuccess, Logout }}>
      {children}
    </authContext.Provider>
  );
}
