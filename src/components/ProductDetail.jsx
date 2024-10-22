import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import AddToCartButton from "./AddToCartButton";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { Fetch } from "../utils/Fetch";

const DataDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [img, setImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const dataResponse = await Fetch(`products/${id}`, "GET", null, null);
      if (dataResponse) {
        const productData = await dataResponse.json();
        setData(productData);
        setImage(productData.thumbnail);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const formatDimensions = (dimensions) => {
    if (!dimensions) return "N/A";
    const { width, height, depth } = dimensions;
    return `Width: ${width}cm, Height: ${height}cm, Depth: ${depth}cm`;
  };

  const changeImage = (image) => {
    setImage(image);
  };

  const handleBuyNow = () => {
    if (data) {
      dispatch(
        addToCart({
          id: data.id,
          title: data.title,
          brand: data.brand,
          category: data.category,
          prices: data.price,
          image: data.thumbnail,
          quantity: 1,
        })
      );
      navigate("/checkout");
    }
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
            {data.images &&
              data.images.map((image, index) => (
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
                imgs: data.thumbnail,
                title: data.title,
                brand: data.brand,
                category: data.category,
                id: data.id,
                prices: data.price,
              }}
            />
            <button
              className="btn btn-success btn-sm"
              type="button"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>

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
