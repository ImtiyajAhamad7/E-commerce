import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, cartLength } from "../store/slices/cartSlice";

const AddToCartButton = (props) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(props.item));
    dispatch(cartLength()); // Update the cart length in the Redux store    
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