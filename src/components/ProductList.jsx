import Loader from "./Loader";
import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";
import { Fetch } from "../utils/Fetch.jsx";

const ProductList = () => {
  const [alert, setAlert] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Fetch("products", "GET");

        // Check if the response is OK and parse it
        if (response) {
          const data = await response.json(); // Parse the JSON data
          console.log("Parsed data:", data); // Log the parsed data

          // Assuming the products are directly returned as an array
          if (Array.isArray(data)) {
            setData(data); // Set data if it's an array
          } else {
            console.error("Response is not an array:", data);
            setError(new Error("Failed to load products."));
          }
        } else {
          console.error("Response not OK:", response);
          setError(new Error("Failed to fetch products."));
        }
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err); // Log any errors
        setError(err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  // Check if data is an array before filtering
  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

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
      ) : error ? (
        <div className="alert alert-danger">{error.message}</div>
      ) : (
        <div className="row">
          {filteredData.length > 0 ? (
            filteredData.map((product) => (
              <div className="col-md-4 col-lg-3 mb-4" key={product._id}>
                <ProductItem
                  id={product._id}
                  imgs={product.thumbnail}
                  title={product.title}
                  brand={product.brand}
                  category={product.category}
                  prices={product.price}
                />
              </div>
            ))
          ) : (
            <div>No products found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
