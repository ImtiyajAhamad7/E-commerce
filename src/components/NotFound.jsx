import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-1">404</h1>
      <h2 className="mt-4">Page Not Found</h2>
      <p className="lead">
        We're sorry, but the page you are looking for does not exist.
      </p>
      <Link href="/" className="btn btn-primary mt-3">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
