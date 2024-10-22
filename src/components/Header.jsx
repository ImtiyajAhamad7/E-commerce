import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn } from "../auth/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const count = useSelector((state) => state.cart.items);
  console.log("cccc", count);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the access token from sessionStorage
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userId");

    // Optionally, if using refresh tokens, clear that too
    // sessionStorage.removeItem("refreshToken");

    // Redirect to the login page or home page
    navigate("/login"); // Redirect user to the login page
  };

  return (
    <header className="bg-primary py-3">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand text-white" to="/">
            ShoppyGlobe
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/products">
                  Products
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item position-relative">
                <Link
                  className="nav-link text-white d-flex flex-column align-items-center"
                  to="/cart"
                >
                  <span className="cart-icon-container">
                    <span className="cart-count">{count.length}</span>
                    <IoCartOutline size={24} className="me-1" />
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                {!isLoggedIn() ? (
                  <Link
                    className="nav-link text-white d-flex align-items-center"
                    to="/login"
                  >
                    <span>Login</span>
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="btn btn-danger ms-2"
                  >
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
