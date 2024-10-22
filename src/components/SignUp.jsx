import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../utils/Alert.jsx";
import { Fetch } from "../utils/Fetch.jsx";

const SignUp = () => {
  const [userdata, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [uerror, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({
      ...userdata,
      [id]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    setServerError("");

    if (userdata.password !== userdata.confirmPassword) {
      setError(true);
      return;
    }

    setLoading(true);
    setSuccessMessage("");

    try {
      const response = Fetch(`user`, "POST", userdata);

      if (response) {
        setSuccessMessage("User registered successfully!");
        setData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }); // Clear form
        navigate("/");
      } else {
        // const errorData = await response.json();
        setServerError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setServerError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="text-center">Sign Up</h2>
          {uerror && (
            <Alert
              message={"Passwords do not match"}
              type={"danger"}
              onDismiss={() => setError(false)}
            />
          )}
          {successMessage && (
            <Alert
              message={successMessage}
              type={"success"}
              onDismiss={() => setSuccessMessage("")}
            />
          )}
          {serverError && (
            <Alert
              message={serverError}
              type={"danger"}
              onDismiss={() => setServerError("")}
            />
          )}
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Enter your first name"
                value={userdata.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Enter your last name"
                value={userdata.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={userdata.email}
                onChange={handleChange}
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
                placeholder="Enter your password"
                value={userdata.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={userdata.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <div className="mt-3 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="link-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
