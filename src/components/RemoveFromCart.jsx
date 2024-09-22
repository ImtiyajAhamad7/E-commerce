import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../store/slices/cartSlice";

const RemoveFromCart = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item));
  };
  return (
    <div>
      <button
        className="btn btn-danger btn-sm custom-btn"
        onClick={handleRemove}
      >
        Remove From Cart
      </button>
    </div>
  );
};

export default RemoveFromCart;
