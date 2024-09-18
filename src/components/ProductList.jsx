import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setData(data.products);
      });
  }, []);

  console.log("data", data);
  return (
    <div className="container mt-4">
      {data.length === 0 ? (
        <Loader />
      ) : (
        <div className="row">
          {data.map((product) => (
            <div className="col-md-4 col-lg-3 mb-4" key={product.id}>
              <ProductItem
                id={product.id}
                imgs={product.thumbnail}
                title={product.title}
                brand={product.brand}
                category={product.category}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
