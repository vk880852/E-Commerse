import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import moment from 'moment'; // Import moment for date formatting

const Order = () => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/orders');
      setOrders(response.data);
    } catch (error) {
      console.log("Something went wrong while accessing order data", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [auth?.accesstoken]);

  return (
    <div className='container py-4'>
      <div className='row justify-content-center'>
        <div className='col-lg-10'>
          <div className='card shadow'>
            <div className='card-body'>
              <h2 className='card-title text-center mb-4'>All Orders</h2>
              {orders.map((order, index) => (
                <div className="border p-4 mb-4 rounded" key={order._id}>
                  <table className="table table-bordered mb-4">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment Status</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{order.status}</td>
                        <td>{order.buyer.name}</td>
                        <td>{moment(order.createAt).format('MMMM Do YYYY, h:mm a')}</td>
                        <td>{order.payment.success ? "Success" : "Failed"}</td>
                        <td>{order.products.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {order.products.map((product) => (
                      <div className="row mb-3 p-3 border rounded" key={product._id}>
                        <div className="col-md-4">
                          <img
                            src={`http://localhost:8000/api/v1/getphoto/product/${product._id}`}
                            className="card-img-top img-fluid"
                            alt={product.name}
                          />
                        </div>
                        <div className="col-md-8 d-flex align-items-center">
                          <div>
                            <h5 className="mb-2"><strong>{product.name}</strong></h5>
                            <p className="mb-1">{product.description.substring(0, 100)}...</p>
                            <p className="mb-1">Price: {product.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
