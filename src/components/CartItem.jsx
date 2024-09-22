import React, { useState } from "react";
import RemoveFromCart from "./RemoveFromCart";

const CartItem = ({ id, title, image, prices, quantityItem }) => {
  const [quantity, setQuantity] = useState(1);

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
