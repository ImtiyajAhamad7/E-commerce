import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import RemoveFromCart from "./RemoveFromCart";
import { updateItemQuantity } from "../store/slices/cartSlice"; // Assuming you have this in Redux
import { Fetch } from "../utils/Fetch.jsx"; // Assuming Fetch is a utility for API requests

const CartItem = ({ id, title, image, prices, quantityItem }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(quantityItem);

  // Function to update quantity both in Redux and Backend
  const updateQuantity = async (newQuantity) => {
    setQuantity(newQuantity); // Update local state

    // Dispatch to Redux store
    dispatch(updateItemQuantity({ id, quantity: newQuantity }));

    const userId = sessionStorage.getItem("userId");
    try {
      const dataToSend = {
        productId: id,
        quantity: newQuantity,
        userId: userId,
      };
      await Fetch(`updateCart`, "PUT", dataToSend); // Assuming this endpoint exists
    } catch (error) {
      console.error("Failed to update quantity on the server:", error);
    }
  };

  // Increment quantity
  const increment = () => {
    updateQuantity(quantity + 1);
  };

  // Decrement quantity (should not go below 1)
  const decrement = () => {
    if (quantity > 1) {
      updateQuantity(quantity - 1);
    }
  };

  return (
    <div className="d-flex align-items-center">
      <img
        src={image}
        alt={title}
        className="img-fluid me-3"
        style={{ width: "100px", height: "100px" }}
      />
      <div className="flex-grow-1">
        <h5>{title}</h5>
        <p>Price: ${(prices * quantity).toFixed(2)}</p>
        <div className="d-flex align-items-center">
          <button onClick={decrement} className="btn btn-secondary me-2">
            -
          </button>
          <span>{quantity}</span>
          <button onClick={increment} className="btn btn-secondary ms-2">
            +
          </button>
        </div>
      </div>
      <RemoveFromCart item={{ id }} />
    </div>
  );
};

export default CartItem;
