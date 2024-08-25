import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout.jsx";
import { useAuth } from "../context/auth.jsx";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Prices.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { auth, setAuth } = useAuth();
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [check, setCheck] = useState([]);
  const [radio, setRadio] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  // Function to fetch total product count
  const getTotal = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/product-count`);
      setTotal(res.data.product); // Assuming the response structure has a property 'productCount'
    } catch (error) {
      console.error("Error while fetching total product count:", error);
      toast.error(`Something went wrong while accessing totalCount: ${error.message}`);
    }
  };

  // Function to load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/api/v1/product-list/${page}`);
      setProduct([...product, ...res.data.products]); 
      setLoading(false);
    } catch (error) {
      console.error("Error while loading more products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page > 1) {
      loadMore();
    }
  }, [page]);

  // Function to fetch all products
  const getAllProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/product-list/${page}`);
      setProduct(res.data.products);
    } catch (error) {
      console.error("Error while fetching all products:", error);
      toast.error(`Something went wrong while fetching products: ${error.message}`);
    }
  };

  // Function to fetch all categories
  const getAllCategory = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/category`);
      if (res.data.message === "All Category is Found") {
        setCategory(res.data.category);
      }
    } catch (error) {
      console.error("Error while retrieving categories:", error);
      toast.error(`Something went wrong while retrieving categories: ${error.message}`);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // useEffect to apply filter when radio or check state changes
  useEffect(() => {
    if (check.length > 0 || radio !== "") {
      filter();
    } else {
      getAllProduct(); // Fetch all products when no filters are applied
    }
  }, [check, radio]);

  // Function to handle category filter checkbox change
  const handleFilter = async (e, id) => {
    let updatedCheck = [...check];
    if (e.target.checked) {
      updatedCheck.push(id);
    } else {
      updatedCheck = updatedCheck.filter((categoryId) => categoryId !== id);
    }
    setCheck(updatedCheck);
  };

  // Function to apply filter
  const filter = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/product/product-sort`,
        { check, radio }
      );
      setProduct(res.data.product);
    } catch (error) {
      console.error("Error while applying filter:", error);
      toast.error("Something went wrong while sorting data");
    }
  };

  return (
    <Layout title="All-Product">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="mb-4">
              <h6 className="text-center mb-3">Filter by Category</h6>
              <div className="d-flex flex-column">
                {category.map((categoryItem) => (
                  <Checkbox
                    key={categoryItem._id}
                    checked={check.includes(categoryItem._id)}
                    onChange={(e) => handleFilter(e, categoryItem._id)}
                  >
                    {categoryItem.name}
                  </Checkbox>
                ))}
              </div>
            </div>
            <div>
              <h6 className="text-center mb-3">Filter by Price</h6>
              <div className="d-flex flex-column">
                <Radio.Group value={radio} onChange={(e) => setRadio(e.target.value)}>
                  {Prices.map((priceOption) => (
                    <Radio key={priceOption.array} value={priceOption.array}>
                      {priceOption.name}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
            </div>
            <div className="text-center mt-3">
              <button
                onClick={() => {
                  window.location.reload();
                  // setCheck([]);
                  // setRadio("");
                }}
                className="btn btn-danger"
              >
                Reset Filters
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-4">All Products</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {product.map((productItem) => (
                <div key={productItem._id} className="col">
                  <div className="card h-100">
                    <img
                      src={`http://localhost:8000/api/v1/getphoto/product/${productItem._id}`}
                      className="card-img-top"
                      alt={productItem.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{productItem.name}</h5>
                      <p className="card-text">{productItem.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">${productItem.price}</p>
                        <button className="btn btn-primary" onClick={()=>navigate(`/${productItem.slug}`)}>More Detail</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {product.length < total && (
              <div className="text-center mt-4">
                <button
                  className="btn btn-primary"
                  onClick={() => setPage(page + 1)}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
