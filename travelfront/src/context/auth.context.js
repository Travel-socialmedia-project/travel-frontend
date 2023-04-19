import React, { useState, useEffect } from "react";

import api from "../service/service";

const API_URL = "http://localhost:5005";
 
const AuthContext = React.createContext();
 
function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
 const [ token, setToken] = useState(null)
  
  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
    
   
  }  
 
  
  const authenticateUser = () => {           //  <==  ADD  
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    console.log(storedToken)
    // If the token exists in the localStorage
    if (storedToken) {
      console.log(storedToken)
      // We must send the JWT token in the request's "Authorization" Headers
      api.get(
        `${API_URL}/auth/verify`, 
        { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
        // If the server verifies that the JWT token is valid  
        const user = response.data;
       // Update state variables        
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);        
      })
      .catch((error) => {
        // If the server sends an error response (invalid token) 
        // Update state variables         
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);        
      });      
    } else {
      // If the token is not available (or is removed)
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);      
    }   
  }
 
  
  useEffect(() => {                 //  <==  ADD                                   
    setToken(token)
  }, []);
 
  
  return (                                                   
    <AuthContext.Provider 
      value={{ 
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        token,
        authenticateUser        
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
 
export { AuthProviderWrapper, AuthContext };