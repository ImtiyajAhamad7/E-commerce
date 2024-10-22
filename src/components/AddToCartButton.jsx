import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { useState } from "react";
import Alert from "../utils/Alert";
import { Fetch } from "../utils/Fetch.jsx";

const AddToCartButton = ({ item }) => {
  const dispatch = useDispatch();
  const [added, setAddd] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleAddToCart = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      console.error("User is not logged in.");
      return;
    }

    // Data to match your Cart schema
    const dataToSend = {
      userId, // UserId must be present and valid
      productId: item.id, // Ensure this is the product's MongoDB ObjectId
      quantity: 1, // You can dynamically set quantity as needed
    };
    await Fetch("cart", "POST", dataToSend);
    dispatch(addToCart(item));

    setAddd(true);
    setAlert(true);
  };

  function handleDismiss() {
    setAlert(false);
  }

  return (
    <>
      {added ? (
        <>
          <p>Added To cart</p>
          {alert && (
            <Alert
              message={"Item Added"}
              type={"success"}
              onDismiss={handleDismiss}
            />
          )}
        </>
      ) : (
        <button
          className="btn btn-secondary btn-sm custom-btn"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      )}{" "}
    </>
  );
};

export default AddToCartButton;
