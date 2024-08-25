import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
    mobilenumber: "",
    address: "",
    admin: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "admin") {
      setFormData({ ...formData, [name]:(value==="1") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://e-commerse-1-61im.onrender.com/api/v1/register`,
        formData
      );
      toast.success("Register Successful");
      navigate("/login");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Register-e-commerce-web">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5">
              <div className="card-body">
                <div className="register">
                  <h2 className="card-title text-center mb-4">Register</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">UserName</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="Enter User-name"
                        required
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="admin" className="form-label">Choose Admin</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        id="admin"
                        name="admin"
                        onChange={handleChange}
                        defaultValue=""
                      >
                        <option value="" disabled>Open this select menu</option>
                        <option value="1">Admin</option>
                        <option value="0">No-Admin</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="fullname" className="form-label">FullName</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullname"
                        name="fullname"
                        placeholder="Enter Fullname"
                        required
                        value={formData.fullname}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmpassword"
                        name="confirmpassword"
                        placeholder="Confirm Password"
                        required
                        value={formData.confirmpassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mobilenumber" className="form-label">Mobile Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="mobilenumber"
                        name="mobilenumber"
                        placeholder="Mobile Number"
                        minLength={10}
                        maxLength={10}
                        required
                        value={formData.mobilenumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="Enter Address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
