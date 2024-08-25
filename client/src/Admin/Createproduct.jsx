import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Layout from '../Components/Layout/Layout.jsx';
import { toast } from 'react-toastify';

const CreateProduct = () => {
  const [category1, setAllcategory] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    photo: null, 
    shipping: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const getallcategory = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/category`);
      if (res.data.message === 'All Category is Found') {
        setAllcategory(res.data.category);
      }
    } catch (error) {
      console.log('Error happened while retrieving categories:', error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getallcategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const res = await axios.post("http://localhost:8000/api/v1/upload", formDataToSend);
      toast.success('Product created successfully');
    } catch (error) {
      console.error("Error:", error);
      toast.error('Something went wrong while creating the product');
    }
  };

  return (
    <>
      <div className="container">
        <div className='row justify-content-center'>
          <div className="col-md-6">
            <div className="card mt-5">
              <div className="card-body">
                <div className="register">
                  <h2 className="card-title text-center mb-4">Create Product</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label mb-3">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Enter Product Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='mb-3'>
                      <select id='category' name="category" onChange={handleChange}>
                        <option>Select the Category</option>
                        {category1.map((x) => (
                          <option value={x._id} key={x._id}>{x.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className='mb-3'>
                    <label htmlFor='upload-image' className='btn btn-outline-secondary'>
                      <input type='file' name='photo' accept='image/*' onChange={handleFileChange} />
                    </label>
                    </div>
                    <div className='mb-3'>
                      {
                        formData.photo&&(<div className='text-center'>
                          <img src={URL.createObjectURL(formData.photo)} alt="image" height={'200px'} className='image image-responsive'/>
                        </div>)
                      }
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        placeholder="Enter Product Description"
                        rows="3"
                        required
                        value={formData.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        placeholder="Enter Product Price"
                        required
                        min={1}
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="quantity" className="form-label">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        placeholder="Enter Product Quantity"
                        required
                        value={formData.quantity}
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
    </>
  );
};

export default CreateProduct;
