import React from "react";
import ProductList from "./ProductList";

const HomePage = () => {
  return (
    <div>
      {/* Header */}
      <header className="bg-dark text-white text-center py-5">
        <h1>Welcome to ShoppyGlobe</h1>
        <p>Your one-stop shop for everything!</p>
      </header>

      {/* Product Showcase */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row">
          <ProductList />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
