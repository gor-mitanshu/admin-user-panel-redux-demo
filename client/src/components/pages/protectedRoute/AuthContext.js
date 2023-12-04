import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
     return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
     const [token, setToken] = useState(localStorage.getItem("token"));

     const login = (newToken) => {
          setToken(newToken);
          localStorage.setItem("token", newToken);
     };

     const logout = () => {
          setToken(null);
          localStorage.removeItem("token");
     };

     const isAuthenticated = () => {
          const decodedToken = decodeToken();
          if (!decodedToken) {
               return false;
          }

          const currentTimestamp = Math.floor(Date.now() / 1000);

          return currentTimestamp >= decodedToken.iat && currentTimestamp <= decodedToken.exp;
     };

     const decodeToken = () => {
          try {
               const storedToken = localStorage.getItem("token");
               if (!storedToken) {
                    return null;
               }

               const tokenParts = storedToken.split(".");
               const payload = JSON.parse(atob(tokenParts[1]));
               return payload;
          } catch (error) {
               console.error("Error decoding token:", error);
               return null;
          }
     };

     useEffect(() => {
          const checkTokenExpiration = () => {
               if (!isAuthenticated()) {
                    logout();
               }
          };

          checkTokenExpiration();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [token]);

     return (
          <AuthContext.Provider value={ { token, login, logout, isAuthenticated } }>
               { children }
          </AuthContext.Provider>
     );
};
