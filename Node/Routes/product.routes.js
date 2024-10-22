import {
  getAllProducts,
  createProduct,
  getProductById,
} from "../Controller/products.controller.js";

export function routes(app) {
  app.get("/api/products", getAllProducts);
  app.post("/api/postpro", createProduct);
  app.get("/api/products/:productId", getProductById);
}
