import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const count = useSelector((state) => state.cart.items);
  console.log("cccc", count);
  const dispatch = useDispatch();
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
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/products">
                  Products
                </Link>
              </li>

              <ul className="navbar-nav ms-auto">
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
              </ul>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
