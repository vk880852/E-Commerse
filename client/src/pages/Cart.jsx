import React, { useEffect, useState } from 'react';
import { useCart } from '../context/Cart';
import Layout from '../Components/Layout/Layout';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Cart = () => {
  const { cart, setCart } = useCart([]);
  const [cartTotal, setCartTotal] = useState("$0.00");
  const [clientToken, setClientToken] = useState(""); 
  const [instance, setInstance] = useState(""); 
  const {auth} =useAuth();
  const navigate=useNavigate();

  const totalPrice = async () => {
    try {
      let value = 0;
      cart.forEach(item => {
        value += item[0].price;
      });
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });
    } catch (error) {
      console.log(`Something went wrong while calculating the total price: ${error}`);
      return "$0.00";
    }
  };

  useEffect(() => {
    const getCartItem = () => {
      const cartItems = localStorage.getItem("cart");
      if (cartItems) {
        try {
          const parsedCart = JSON.parse(cartItems);
          if (Array.isArray(parsedCart)) {
            setCart(parsedCart);
          } else {
            setCart([]);
          }
        } catch (error) {
          console.error("Error parsing cart items from localStorage:", error);
          setCart([]);
        }
      } else {
        setCart([]);
      }
    };
    getCartItem();
  }, [setCart]);

  const removeCart = (id) => {
    const updatedCart = cart.filter(item => item[0]._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const fetchClientToken = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/v1/braintree/token`);
      setClientToken(data.clientToken);
    } catch (error) {
      console.log(`Error fetching client token: ${error}`);
    }
  };

  useEffect(() => {
    const fetchTotalPrice = async () => {
      const price = await totalPrice();
      setCartTotal(price);
    };
    fetchTotalPrice();
  }, [cart]);
  useEffect(()=>{
    fetchClientToken();
  },[])

  const handlePayment = async() => {
     try {
      const {nonce}=await instance.requestPaymentMethod();
      const {data}=await axios.post(`http://localhost:8000/api/v1/braintree/payment`,{nonce,cart});
      console.log(`handle payment data ${data}`);
      localStorage.removeItem('cart');
      setCart([]);
      toast.success("Payment Successfully");
      navigate("/dashboard/user/order")
     } catch (error) {
      console.log(`error happened in handlePayment ${error}`)
     }
  };

  return (
    <Layout title='Cart'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h5 className='text-center'>You have {cart.length} Items in Your Cart</h5>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8'>
            {cart.map(item => (
              <div key={item[0]._id} className='row mb-3'>
                <div className='col-md-4'>
                  <img
                    src={`http://localhost:8000/api/v1/getphoto/product/${item[0]._id}`}
                    className="card-img-top"
                    alt={item[0].name}
                  />
                </div>
                <div className='col-md-8 card-body'>
                  <h5 className="card-title">{item[0].name}</h5>
                  <p className="card-text">$ {item[0].price}</p>
                  <p className='card-text'>{item[0].description.split(" ").splice(0, 5).join(" ") + "..."}</p>
                  <button className='btn btn-danger' onClick={() => removeCart(item[0]._id)}>Remove Cart</button>
                </div>
              </div>
            ))}
          </div>
          <div className='col-md-4'>
            <h4 className='text-center'>Cart-Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h6 className="text-center">Total: {cartTotal}</h6>
            <div className='d-flex justify-content-center align-items-center flex-column'>
              {clientToken&&auth.username && auth.accesstoken &&(
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: 'vault'
                    }
                  }}
                  onInstance={instance => setInstance(instance)}
                />
              )}
              <button className='btn btn-success mt-3' onClick={handlePayment}>Make Payment</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
