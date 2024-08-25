import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.jsx";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { auth,setAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try 
      {
        const res = await axios.post(
          `https://e-commerse-1-61im.onrender.com/api/v1/logout`,
        );
        if (res.data.message) {
          toast.success(res.data.message);
          await localStorage.removeItem("auth"); 
          setAuth({...auth,username:null,accesstoken:""})
          navigate("/");
        }
      } catch (error) {
        toast.error(`Do sign-in again`); 
        await localStorage.removeItem("auth"); 
        setAuth({...auth,username:null,accesstoken:""})
        navigate("/");
        console.error("Error during logout:", error);
      }
    };

    fetchData();
  }, []);

};

export default Logout;
