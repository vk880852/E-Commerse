import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    mobilenumber: '',
    address: ''
  });

  const getData = async () => {
    try {
      const data1 = await axios.get("http://localhost:8000/api/v1/get-user-information");
      setFormData(data1.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6'>
          <div className='card shadow-sm'>
            <div className='card-body'>
              <h2 className='card-title text-center mb-4'>Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor='username' className='form-label'>Username</label>
                  <input
                    type='text'
                    className='form-control'
                    id='username'
                    name='username'
                    placeholder='Enter Username'
                    required
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='fullname' className='form-label'>Full Name</label>
                  <input
                    type='text'
                    className='form-control'
                    id='fullname'
                    name='fullname'
                    placeholder='Enter Full Name'
                    required
                    value={formData.fullname}
                    onChange={handleChange}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>Email address</label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    name='email'
                    placeholder='Enter Email'
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='password' className='form-label'>Password</label>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    name='password'
                    placeholder='Password'
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='mobilenumber' className='form-label'>Mobile Number</label>
                  <input
                    type='tel'
                    className='form-control'
                    id='mobilenumber'
                    name='mobilenumber'
                    placeholder='Mobile Number'
                    minLength={10}
                    maxLength={10}
                    required
                    value={formData.mobilenumber}
                    onChange={handleChange}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='address' className='form-label'>Address</label>
                  <input
                    type='text'
                    className='form-control'
                    id='address'
                    name='address'
                    placeholder='Enter Address'
                    required
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <button type='submit' className='btn btn-primary w-100'>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
