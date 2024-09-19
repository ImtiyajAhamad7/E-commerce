import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";

const AddToCartButton = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  return (
    <button
      className="btn btn-secondary btn-sm custom-btn"
      onClick={handleAddToCart}
    >
      Add To Cart
    </button>
  );
};

export default AddToCartButton;
