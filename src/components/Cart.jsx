import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { fetchCartItems, clearCart } from "../store/slices/cartSlice"; // Ensure this action exists
import { Fetch } from "../utils/Fetch"; // Import the Fetch utility

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const userId = sessionStorage.getItem("userId"); // Assuming userId is stored in sessionStorage
  console.log("userId", userId);

  // Fetch cart items when component mounts and userId changes
  useEffect(() => {
    const fetchCartItemsFromAPI = async () => {
      if (!userId) {
        dispatch(clearCart()); // Clear cart if no userId found
        return;
      }

      try {
        const response = await Fetch(`cart/${userId}`, "GET", null, userId); // Adjust API endpoint
        if (response) {
          const data = await response.json();
          if (data && data.items) {
            // Check if items exist in the response
            dispatch(fetchCartItems(data.items)); // Dispatch action to set cart items
          }
        }
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItemsFromAPI();
  }, [dispatch, userId]); // Run effect when userId changes

  return (
    <div>
      <h2>Cart Items</h2>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <h4>No Item Found</h4>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png"
            alt="Empty Cart"
            width={"500px"}
            height={"500px"}
          />
        </div>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <CartItem
                key={item.productId._id} // Use productId._id to uniquely identify items
                id={item.productId._id}
                title={item.productId.title}
                prices={item.productId.prices}
                quantityItem={item.quantity}
                image={item.productId.imgs}
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
