import React from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import AddToCartButton from "./AddToCartButton.jsx";
import { isLoggedIn } from "../auth/auth.js";

const ProductItem = ({ imgs, title, brand, category, id, prices }) => {
  // const count = useSelector((state) => state.counter.value);

  return (
    <div className="card product-card h-100 shadow-sm">
      <img src={imgs} className="card-img-top" alt={title} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          <strong>Brand:</strong> {brand}
        </p>
        <p className="card-text">
          <strong>Category:</strong> {category}
        </p>
        <div className="d-flex justify-content-between mt-auto">
          <Link
            to={`/products/productdetails/${id}`}
            className="btn btn-primary btn-sm custom-btn"
          >
            View Details
          </Link>
          {isLoggedIn() ? (
            <AddToCartButton
              item={{ imgs, title, brand, category, id, prices }}
            />
          ) : (
            <Link to={"/login"}>Add to cart</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
