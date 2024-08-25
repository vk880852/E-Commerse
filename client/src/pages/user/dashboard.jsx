import React, { useState } from 'react';
import Profile from './Profile.jsx';
import Layout from '../../Components/Layout/Layout.jsx';
import { useAuth } from '../../context/auth.jsx';
import CreateProduct from '../../Admin/Createproduct.jsx';
import GetProduct from '../../Admin/GetProduct.jsx';
import CreateCategory from '../../Admin/Category/CreateCategory.jsx'
import Order from './Order.jsx'

const Dashboard = () => {
  const [type, setType] = useState("profile");
  const {auth}=useAuth();


  const buttonHandler = (e) => {
    setType(e.target.name);
  }
  console.log(type);

  return (
    <Layout title="Dashboard">
    <div className='container mt-5'>
      <div className='row'>
      {
       auth.username?(<div className='col-md-4 col-sm-12 mb-4'>
          <h2 className='text-center mb-4'>Dashboard</h2>
          <div className='d-grid gap-2'>
            <button className='btn btn-outline-primary' name="profile" onClick={buttonHandler}>Profile</button>
            <button className='btn btn-outline-primary' name="orders" onClick={buttonHandler}>Orders</button>
            {
            auth.admin&&<button className='btn btn-outline-primary' name="get-product" onClick={buttonHandler}>UpdateProduct</button>
            }
            {
            auth.admin&&<button className='btn btn-outline-primary' name="create-product" onClick={buttonHandler}>CreateProduct</button>
            }
            {
            auth.admin&&<button className='btn btn-outline-primary' name="create-category" onClick={buttonHandler}>CreateCategory</button>
            }
          </div>
        </div>):(<h3 className="text-center">First Login</h3>)
      }
        <div className='col-md-8 col-sm-12'>
          <div className='card'>
            <div className='card-body'>
              {type && type === "profile" && <Profile />}
              {type && type==="get-product" &&<GetProduct/>}
              {type && type === "create-product" && <CreateProduct/>}
              {type && type === "create-category" && <CreateCategory/>}
              {type && type === "orders" && <Order/>}
            </div>  
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default Dashboard;
