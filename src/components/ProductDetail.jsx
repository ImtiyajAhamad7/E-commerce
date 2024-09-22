import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader"; // Assuming you have a Loader component
import useFetch from "../utils/useFetch"; // Custom hook for fetching data
import AddToCartButton from "./AddToCartButton"; // Button component to add items to cart
import { Link } from "react-router-dom";

const DataDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products/${id}`,
    true
  );

  const [img, setImage] = useState(data?.thumbnail);

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
    <Loader />
  ) : (
    <div className="container mt-5">
      <div className="row">
        {/* Image Section */}
        <div className="col-md-6">
          <div className="data-gallery">
            <img
              src={img || data.thumbnail}
              alt={data.title}
              className="img-fluid"
              width={"300px"}
              height={"250px"}
            />
          </div>
          <div className="row mt-3">
            {data.images && data.images.map((image, index) => (
              <div className="col-3" key={index}>
                <img
                  src={image}
                  alt={`data ${index}`}
                  className="img-thumbnail"
                  onClick={() => changeImage(image)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Information Section */}
        <div className="col-md-6">
          <h1 className="display-5">{data.title}</h1>
          <p className="text-muted">
            <strong>Brand:</strong> {data.brand}
          </p>
          <p className="text-muted">
            <strong>Category:</strong> {data.category}
          </p>
          <h3 className="text-success">${data.price}</h3>
          <p className="data-description mt-4">{data.description}</p>

          {/* Action buttons */}
          <div className="d-grid gap-2 d-md-block mt-4">
            <AddToCartButton
              item={{
                img: data.thumbnail,
                title: data.title,
                brand: data.brand,
                category: data.category,
                id: data.id,
                price: data.price,
              }}
            />
            <Link
              to={"/checkout"}
              className="btn btn-success btn-sm"
              type="button"
            >
              Buy Now
            </Link>
          </div>

          {/* Rating Section */}
          <div className="mt-4">
            <strong>Rating: </strong>
            <span className="badge bg-warning text-dark">
              {data.rating} / 5
            </span>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="row mt-5">
        <div className="col-12">
          <h4>Specifications</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Weight:</strong> {data.weight || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Dimensions:</strong> {formatDimensions(data.dimensions)}
            </li>
            <li className="list-group-item">
              <strong>Color:</strong> {data.color || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Warranty:</strong> {data.warranty || "N/A"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DataDetail;
