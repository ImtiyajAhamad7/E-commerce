import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import RemoveFromCart from "./RemoveFromCart";
import { updateItemQuantity } from "../store/slices/cartSlice";

const CartItem = ({ id, title, image, prices, quantityItem }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(quantityItem);

  useEffect(() => {
    dispatch(updateItemQuantity({ id, quantity }));
  }, [quantity, dispatch, id]);

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
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
