import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import store from "./store/store.js";
import { Provider } from "react-redux";

import Loader from "./components/Loader.jsx";
import { lazy } from "react";
import PrivateRoute from "./components/PrivateRoute.jsx";

const App = lazy(() => import("./App.jsx"));
const HomePage = lazy(() => import("./components/HomePage.jsx"));
const ProductDetail = lazy(() => import("./components/ProductDetail.jsx"));
const ProductList = lazy(() => import("./components/ProductList.jsx"));
const Cart = lazy(() => import("./components/Cart.jsx"));
const NotFound = lazy(() => import("./components/NotFound.jsx"));
const Checkout = lazy(() => import("./components/Checkout.jsx"));
const Login = lazy(() => import("./components/Login.jsx"));
const SignUp = lazy(() => import("./components/SignUp.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loader />}>
            {" "}
            <HomePage />{" "}
          </Suspense>
        ),
      },
      {
        path: "/products",
        element: (
          <Suspense fallback={<Loader />}>
            <ProductList />{" "}
          </Suspense>
        ),
      },
      {
        path: "products/productdetails/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={<Loader />}>
            <Checkout />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<Loader />}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
