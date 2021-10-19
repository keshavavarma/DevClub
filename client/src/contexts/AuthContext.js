import { createContext, useEffect, useRef, useState } from "react";
import { getToken } from "../util";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const isAuth = useRef(false);
  const token = useRef({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    token.current = getToken();
    if (typeof token.current === "string") {
      isAuth.current = true;
    } else {
      isAuth.current = false;
    }
    setLoading(false);
  }, []);
  console.log("isAuth in AuthContext.js", isAuth.current);

  const value = {
    isAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
