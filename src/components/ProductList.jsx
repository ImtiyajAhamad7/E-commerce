import Loader from "./Loader";
import ProductItem from "./ProductItem";
import useFetch from "../utils/useFetch";
import { useState } from "react";
import Alert from "../utils/Alert";
import { MdError } from "react-icons/md";

const ProductList = () => {
  const [alert, setAlert] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { data, loading, error } = useFetch(
    "https://dummyjson.com/products", // Corrected URL
    false
  );

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  let filteredData = data;

  if (data) {
    filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  return (
    <div className="container mt-4">
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={handleChange}
        className="form-control mb-3"
      />
      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          {filteredData.map((product) => (
            <div className="col-md-4 col-lg-3 mb-4" key={product.id}>
              <ProductItem
                id={product.id}
                imgs={product.thumbnail}
                title={product.title}
                brand={product.brand}
                category={product.category}
                prices={product.price}
              />
            </div>
          ))}

          {error && (
            <div className="col-12">
              <p className="text-danger d-flex align-items-center">
                <MdError className="me-2" size={24} /> {/* Error icon */}
                {`${error}`}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
