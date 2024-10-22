import products from "../Model/products.model.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const productsres = await products.find();
    if (productsres.length > 0) return res.send(productsres);
    return res.status(404).json({ message: "No products found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const newProduct = new products(req.body); // Create a new product instance with the request body
    await newProduct.save(); // Save the product to the database
    res.status(201).json(newProduct); // Send a response with the created product
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  const { productId } = req.params; // Match the parameter name from the route
  console.log("product ID", productId);
  try {
    const product = await products.findById(productId); // Find the product by ID
    if (!product) {
      return res.status(404).json({ message: "Product not found" }); // Handle case where product is not found
    }
    return res.json(product); // Send the found product as a response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
