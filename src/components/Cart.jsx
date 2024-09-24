import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log("cartItems", cartItems);

  return (
    <div>
      <h2>Cart Items</h2>
      {cartItems.length === 0 ? (
        <div className=" text-center">
          <h4>No Item Found</h4>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png"
            alt=""
            width={"500px"}
            height={"500px"}
          />
        </div>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                title={item.title}
                prices={item.prices}
                quantityItem={item.quantity}
                image={item.imgs}
              />
            ))}
          </ul>
          <Link
            to={"/checkout"}
            className="btn btn-success btn-lg m-5"
            type="button"
          >
            Checkout
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
