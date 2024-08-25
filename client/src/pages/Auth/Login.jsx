import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth.jsx';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout.jsx';

const Login = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://e-commerse-1-61im.onrender.com/api/v1/login`, { ...formData });
      if (res && res.data) {
        toast.success("Successfully Logged in");
        console.log(res.data);
        setAuth({
          ...auth,
          username: res.data.username,
          accesstoken: res.data.accesstoken,
          admin:res.data.admin
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      }
    } catch (error) {
      console.log(`failed during login process ${error}`)
      toast.error("Login Failed");
    }
  };

  return (
  <Layout title='Login-Page'>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Login Page</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" name='username' value={formData.username} className="form-control" id="username" placeholder="Enter Username" onChange={changeHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" name='password' value={formData.password} className="form-control" id="password" placeholder="Password" onChange={changeHandler} />
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Login;
