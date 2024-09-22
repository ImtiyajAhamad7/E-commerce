import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log("cartItems", cartItems);

  return (
    <div>
      <h2>Cart Items</h2>
      {cartItems.length === 0 ? (
        <div>No Item Found</div>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <CartItem
              id={item.id}
              title={item.title}
              prices={item.prices}
              quantity={item.quantity}
              image={item.imgs}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
