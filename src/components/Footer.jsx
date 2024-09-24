import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              We are a company dedicated to providing the best services for our
              customers.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white">
                  Home
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: info@gmail.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="text-center mt-3">
          <small>
            &copy; {new Date().getFullYear()} ShoppyGLobe. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
