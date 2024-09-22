import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import ProductList from "./components/ProductList.jsx";

// import ProductDetail from "./components/ProductDetail.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
// import Cart from "./components/Cart.jsx";
// import HomePage from "./components/HomePage.jsx";
import Loader from "./components/Loader.jsx";
import { lazy } from "react";
import Checkout from "./components/Checkout.jsx";

const App = lazy(() => import("./App.jsx"));
const HomePage = lazy(() => import("./components/HomePage.jsx"));
const ProductDetail = lazy(() => import("./components/ProductDetail.jsx"));
const ProductList = lazy(() => import("./components/ProductList.jsx"));
const Cart = lazy(() => import("./components/Cart.jsx"));

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
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
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
