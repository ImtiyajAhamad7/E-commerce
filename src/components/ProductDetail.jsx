import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader"; // Assuming you have a Loader component for the loading state

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [img, setImage] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setImage(data.thumbnail); // Directly setting the data as the product
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the product data:", error);
        setLoading(false);
      });
  }, [id]); // Dependency on id to refetch when the id changes

  // Check if dimensions exist and format them
  const formatDimensions = (dimensions) => {
    if (!dimensions) return "N/A";
    const { width, height, depth } = dimensions;
    return `Width: ${width}cm, Height: ${height}cm, Depth: ${depth}cm`;
  };
  const changeImage = (image) => {
    setImage(image);
  };
  return loading ? (
    <Loader /> // Assuming you have a Loader component
  ) : (
    <div className="container mt-5">
      <div className="row">
        {/* Product Image Section */}
        <div className="col-md-6">
          <div className="product-gallery">
            <img
              src={img}
              alt={product.title}
              className="img-fluid"
              width={"300px"}
              height={"250px"}
            />
          </div>
          {/* Optionally add more images as thumbnails */}
          <div className="row mt-3">
            {product.images &&
              product.images.map((image, index) => (
                <div className="col-3" key={index}>
                  <img
                    src={image}
                    alt={`Product ${index}`}
                    className="img-thumbnail"
                    onClick={() => {
                      changeImage(image);
                    }}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Product Information Section */}
        <div className="col-md-6">
          <h1 className="display-5">{product.title}</h1>
          <p className="text-muted">
            <strong>Brand:</strong> {product.brand}
          </p>
          <p className="text-muted">
            <strong>Category:</strong> {product.category}
          </p>

          <h3 className="text-success">${product.price}</h3>

          <p className="product-description mt-4">{product.description}</p>

          {/* Action buttons */}
          <div className="d-grid gap-2 d-md-block mt-4">
            <button className="btn btn-primary btn-lg me-2" type="button">
              Add to Cart
            </button>
            <button className="btn btn-success btn-lg" type="button">
              Buy Now
            </button>
          </div>

          {/* Optional Product Rating */}
          <div className="mt-4">
            <strong>Rating: </strong>
            <span className="badge bg-warning text-dark">
              {product.rating} / 5
            </span>
          </div>
        </div>
      </div>

      {/* Product Specifications Section */}
      <div className="row mt-5">
        <div className="col-12">
          <h4>Product Specifications</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Weight:</strong> {product.weight || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Dimensions:</strong>{" "}
              {formatDimensions(product.dimensions)}
            </li>
            <li className="list-group-item">
              <strong>Color:</strong> {product.color || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Warranty:</strong> {product.warranty || "N/A"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
