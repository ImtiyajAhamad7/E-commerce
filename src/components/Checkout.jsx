import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RemoveFromCart from "./RemoveFromCart";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  console.log("sdsfdsffsd1111111111111", cartItems);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.prices * 1, 0)
      .toFixed(2);
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
  };

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>

      <h4>Shopping Cart</h4>
      <ul className="list-group mb-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {item.title} - ${item.prices} x
            <RemoveFromCart item={item.id} />
          </li>
        ))}
      </ul>

      <h4>Total: ${calculateTotal()}</h4>

      <button type="button" className="btn btn-primary" onClick={handleSubmit}>
        Complete Purchase
      </button>
    </div>
  );
};

export default Checkout;
