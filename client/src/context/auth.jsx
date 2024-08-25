import React, { useState, useContext,useEffect ,createContext } from 'react';
import axios from 'axios';
import { FaLessThanEqual } from 'react-icons/fa';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    username: "",
    accesstoken: "",
    admin:false
  });
  axios.defaults.headers.common["Authorization"]=auth?`Bearer ${auth.accesstoken}`:"";
  useEffect(()=>{
      const data=localStorage.getItem("auth");
      const parseData=JSON.parse(data);
      if(parseData?.username)
      {
      setAuth({...auth,
        username:parseData.username,
        accesstoken:parseData.accesstoken,
        admin:parseData.admin
       })
      }
  },[]);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
