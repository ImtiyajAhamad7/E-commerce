import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { useState } from "react";
import Alert from "../utils/Alert";

const AddToCartButton = ({ item }) => {
  const dispatch = useDispatch();
  const [added, setAddd] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleAddToCart = () => {
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
