import React from "react";
import { RiLoader2Fill } from "react-icons/ri";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

const Loader = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <RiLoader2Fill className="text-primary fs-3 spinner-border" />
    </div>
  );
};

export default Loader;
