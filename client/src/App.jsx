import { Routes,Route } from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/contact.jsx"
import Policy from './pages/Policy.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import Register from "./pages/Auth/register.jsx"
import Login from "./pages/Auth/Login.jsx"
import Logout from "./pages/Auth/Logout.jsx"
import CreateProduct from "./Admin/Createproduct.jsx"
import CreateCategory from "./Admin/Category/CreateCategory.jsx"
import GetProduct from "./Admin/GetProduct.jsx"
import UpdateProduct from './Admin/UpdateProduct.jsx'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchItem from "./Components/SearchItem.jsx"
import SingleProduct from "./Components/SingleProduct.jsx"
import Category from "./pages/Category.jsx"
import Cart from "./pages/Cart.jsx"
import Order from './pages/user/Order.jsx'
import Dashboard from "./pages/user/dashboard.jsx"
import Profile from "./pages/user/Profile.jsx"
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/policy" element={<Policy/>}/>
        <Route path="/Signup" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/create-product" element={<CreateProduct/>}/>
        <Route path="/create-category" element={<CreateCategory/>}/>
        <Route path="/get-product" element={<GetProduct/>}/>
        <Route path="/update-product/:slug" element={<UpdateProduct/>}/>
        <Route path="/search-totalItem" element={<SearchItem/>}/>
        <Route path="/:slug" element={<SingleProduct/>}/>
        <Route path="/category/:slug" element={<Category/>}/>
        <Route path="/dashboard/order" element={<Order/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/dashboard/user/profile" element={<Profile/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </>
  )
}

export default App
