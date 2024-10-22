// routes/cart.routes.js

import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../Controller/cart.controller.js";
import { verifyToken } from "../Middleware/varify.js";

export default function cartroutes(app) {
  app.post("/api/cart", verifyToken, addToCart); // Add or update an item in the cart
  app.get("/api/cart/:userId", verifyToken, getCart); // Get the user's cart
  app.delete("/api/cart", verifyToken, removeFromCart); // Remove an item from the cart
  app.put("/api/updateCart", verifyToken, updateCartItemQuantity);
}
