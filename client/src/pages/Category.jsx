import React, { useState, useEffect } from 'react';
import Layout from '../Components/Layout/Layout';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://e-commerse-1-61im.onrender.com/api/v1/single-category/${slug}`);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [slug]);

  return (
    <Layout title="Category">
      <h4 className='text-center mb-4'>List of {slug}</h4>
      <div className="row mt-2">
        {product.map((x) => (
          <div className="col-md-4 mb-3" key={x._id}>
            <div className="card" style={{ width: '18rem' }}>
              <img
                src={`https://e-commerse-1-61im.onrender.com/api/v1/getphoto/product/${x._id}`}
                className="card-img-top"
                alt={x.name}
              />
              <div className="card-body">
                <h5 className="card-title">{x.name}</h5>
                <p className="card-text">{x.description.split(" ").splice(0,5).join(" ")+"..."}</p>
                <Link to={`/${x.slug}`} className="btn btn-primary">
                  More Detail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Category;
