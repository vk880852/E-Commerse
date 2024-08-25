import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Searchinput from "../Searchinput";
import useCategory from "../../Components/Hook/useCategory.jsx";
import { useCart } from "../../context/Cart.jsx";
import { FaCartPlus } from "react-icons/fa";

const Header = () => {
  const { cart } = useCart();
  const { auth } = useAuth();
  const { categories } = useCategory();


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          E-Commerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link"
                activeClassName="active"
                exact
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
            <Searchinput />
            </li>
            <li className="nav-item">
              <NavLink
                to="/signup"
                className="nav-link"
                activeClassName="active"
              >
              {
                auth.username===""?"Sign Up":""
              }
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link" activeClassName="active">
                <div className="position-relative">
                  <FaCartPlus className="fs-3" />
                   <span className="position-absolute top-0 start-100 translate-middle bg-white-600 rounded-circle bg-success text-white text-center d-flex justify-content-center align-items-center animate__animated animate__bounce rounded-circle fs-6 w-5 h-5">
                    {
                      cart.length
                    }
                   </span>
                </div>
              </NavLink>
            </li>
          </ul>
          <div className="dropdown">
            <button
              className="btn btn-successfully rounded-pill shadow-sm dropdown-toggle gap-2"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Categories
            </button>
            {categories.length > 0 ? (
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="dropdownMenuButton2"
              >
                {categories.map((category) => (
                  <li key={category._id}>
                    <Link
                      className="dropdown-item"
                      to={`/category/${category.slug}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div>No categories found</div>
            )}
          </div>
          <div className="dropdown">
            <button
              className="btn  btn-success rounded-pill shadow-sm dropdown-toggle"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
             {
              auth.username?("Logout"):("Login")
             }
            </button>
            <ul
              className="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuButton2"
            >
              <li>
                <Link className="dropdown-item" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li>
              {!auth.username ? (
              <li className="dropdown-item">
                <NavLink
                  to="/login"
                  className="nav-link"
                  activeClassName="active"
                >
                  Login
                </NavLink>
              </li>
            ) : (
              <li className="dropdown-item">
                <NavLink to="/logout" className="nav-link">
                  Logout
                </NavLink>
              </li>
            )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
