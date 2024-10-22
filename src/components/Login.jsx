import React, { useState } from "react";
import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed
import { Fetch } from "../utils/Fetch"; // Ensure Fetch is set up correctly
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      // Await the Fetch call to ensure we get the response
      const res = await Fetch("login", "POST", loginData);

      // Check if the response is OK (status in the range 200-299)
      if (res) {
        const data = await res.json(); // Parse JSON only if response is OK
        console.log("res", data);

        // Store the access token in sessionStorage
        sessionStorage.setItem("accessToken", `${data.accessToken}`);
        sessionStorage.setItem("userId", `${data.user.id}`);

        // Navigate to the home page or desired route after successful login
        navigate("/");
      } else {
        // console.log("Login failed", res.status, res.statusText);
        console.log("no res");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="text-center">Login</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <div className="mt-3 text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="link-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
