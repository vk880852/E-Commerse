import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout.jsx";
import axios from "axios";

const GetProduct = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.post("https://e-commerse-1-61im.onrender.com/api/v1/allproduct");
        console.log(res.data);
        if (res.data.message === 'All Products Fetched') {
          setProduct(res.data.allProducts);
        } else {
          alert(`Something went wrong: ${res.data}`);
        }
      } catch (error) {
        console.log(error);
        alert(`Something went wrong: ${error}`);
      }
    };
    getProduct();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          {product.map((x) => (
            <Link key={x._id} to={`/update-product/${x.slug}`} className="col-md-4 mb-4 d-flex align-items-stretch" style={{ textDecoration: 'none' }}>
              <div className="card h-100">
                <img src={`https://e-commerse-1-61im.onrender.com/api/v1/getphoto/product/${x._id}`} className="card-img-top" alt={x.name} />
                <div className="card-body">
                  <h5 className="card-title text-center">{x.name}</h5>
                  <p className="card-text text-center">
                   {
                    x.description
                   }
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default GetProduct;
