import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout/Layout";
import { useCart } from "../context/Cart.jsx";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const { slug } = useParams();
  const [singleProduct, setSingleProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://e-commerse-1-61im.onrender.com/api/v1/getsingleproduct/${slug}`
      );
      setSingleProduct([res.data.product]);
      if (res.data.product) {
        fetchData1(res.data.product._id, res.data.product.category._id);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchData1 = async (pId, cId) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://e-commerse-1-61im.onrender.com/api/v1/product/similar-product/${pId}/${cId}`
      );
      setRelatedProduct(res.data.similarProducts);
    } catch (error) {
      console.log(
        `Something went wrong while accessing related products: ${error}`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchData();
    }
  }, [slug]);

  return (
    <Layout title="Product Details">
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : singleProduct.length ? (
          singleProduct.map((x)=>(
            <div className="row">
            <div className="col-md-6">
              <img
                src={`https://e-commerse-1-61im.onrender.com/api/v1/getphoto/product/${x._id}`}
                className="img-fluid rounded card-img-top"
                alt={x.name}
              />
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{x.name}</h5>
                  <p className="card-text">
                    <strong>Description</strong>
                    {x.description}
                  </p>
                  <p className="card-text">
                    <strong>Price</strong>: $ {x.price}
                  </p>
                  <p className="card-text">
                    <strong>Category</strong>: {x.category.name}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      if (singleProduct) {
                        setCart([...cart, singleProduct]);
                        localStorage.setItem("cart",JSON.stringify([...cart,singleProduct]))
                        toast.success("Product is Added Successfully");
                        
                      }
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) 
          ))
         : (
          <p>No product found.</p>
        )}

        {relatedProduct.length > 0 && (
          <div className="mt-4">
            <h3>Related Products</h3>
            <div className="row">
              {relatedProduct.map((product) => (
                <div key={product._id} className="col-md-4 mb-3">
                  <div className="card">
                    <img
                      src={`https://e-commerse-1-61im.onrender.com/api/v1/getphoto/product/${product._id}`}
                      className="card-img-top"
                      alt={product.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">$ {product.price}</p>
                      <Link to={`/${product.slug}`} className="btn btn-primary">
                        View Product
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SingleProduct;
