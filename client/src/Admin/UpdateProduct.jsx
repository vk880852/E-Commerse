import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout.jsx";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const {slug} = useParams();
  const [category1, setAllCategory] = useState([]);
  const [pId,setId]=useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    photo: null,
    shipping: true,
  });
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, ["photo"]: e.target.files[0] });
  };

  const getAllCategory = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/category`);
      if (res.data.message === "All Category is Found") {
        setAllCategory(res.data.category);
      }
    } catch (error) {
      console.log("Error happened while retrieving categories:", error);
      toast.error(error.message);
    }
  };

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/getsingleproduct/${slug}`);
      const product = res.data.product;
      setId(res.data.product._id);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category._id,
        quantity: product.quantity,
        photo: null,
        shipping: product.shipping,
      });
    } catch (error) {
      console.log("Something went wrong while accessing the single Product", error);
      toast.error("Something went wrong while accessing the single Product");
    }
  };

  useEffect(() => {
    getAllCategory();
    getSingleProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const res = await axios.put(
        `http://localhost:8000/api/v1/product/update-product/${pId}`,
        formDataToSend
      );
      console.log('Product updated successfully');
      toast.success("Product updated successfully");
      navigate("/allproduct")
    } catch (error) {
      console.log("Error:", error);
      toast.error(`Something went wrong while updating the product ${error}`);
    }
  };
  const handleDelete=async()=>{
     try {
      let ans=window.prompt("Want to delete Product");
      if(ans.toLowerCase()!=="yes")return ;
      const res=await axios.post(`http://localhost:8000/api/v1/product/delete-product/${pId}`);
      toast.success(res.data.message);
     } catch (error) {
         console.log(error);
         toast.error(`something went wrong ${error} `)
     }

  }
  
  return (
    <Layout title="Update Product">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Update Product</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Product Name</label>
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
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                      className="form-select"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option>Select the Category</option>
                      {category1.map((x) => (
                        <option value={x._id} key={x._id}>
                          {x.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="upload-image" className="form-label">Product Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="photo"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  {formData.photo && (
                    <div className="mb-3 text-center">
                      <img
                        src={URL.createObjectURL(formData.photo)}
                        alt="Preview"
                        height="200px"
                        className="img-fluid"
                      />
                    </div>
                  )}
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
                      min={0}
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
                      min={1}
                      value={formData.quantity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                  <button type="submit" className="btn btn-primary w-100">Submit</button>
                  </div>
                </form>
                <div className="mb-3">
                  <button  className="btn btn-danger w-100 " onClick={handleDelete}>Delete</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   </Layout>
  )
}
export default UpdateProduct;