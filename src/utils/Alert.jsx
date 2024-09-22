import React, { useEffect, useState } from "react";

import "../../src/assets/Alert.css";

const Alert = ({ message, type, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Start fading out
      setTimeout(onDismiss, 500); // Wait for fade-out animation to finish before calling onDismiss
    }, 3000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className={`alert alert-${type} alert-dismissible position-fixed ${
        isVisible ? "show" : "fade-out"
      }`}
      role="alert"
      style={{ top: "20px", right: "20px", zIndex: 1050 }}
    >
      {message}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={() => {
          setIsVisible(false); // Start fade out
          setTimeout(onDismiss, 500); // Wait for fade-out animation to finish
        }}
      ></button>
    </div>
  );
};

export default Alert;
