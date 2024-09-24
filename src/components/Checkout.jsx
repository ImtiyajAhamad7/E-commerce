import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RemoveFromCart from "./RemoveFromCart";
import { useNavigate } from "react-router-dom";
import Alert from "../utils/Alert";
import { clearCart } from "../store/slices/cartSlice"; // Import the clearCart action

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.prices * item.quantity, 0)
      .toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert(true);

    // Dispatch the clearCart action
    dispatch(clearCart());
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      {alert ? (
        <>
          <Alert
            message={"Purchase Complete"}
            type={"success"}
            onDismiss={() => setAlert(false)}
          />
          <div className="alert alert-success text-center mt-4"></div>

          <h4 className="alert-heading">Thank You for Your Purchase!</h4>
          <p>Your order has been placed successfully.</p>
          <p>We appreciate your business and hope to see you again soon!</p>
        </>
      ) : (
        <>
          <h4>Shopping Cart</h4>
          <ul className="list-group mb-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.title} - ${item.prices} x {item.quantity}
                <RemoveFromCart item={{ id: item.id }} />
              </li>
            ))}
          </ul>

          <h4>Total: ${calculateTotal()}</h4>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Complete Purchase
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
