// controllers/cart.controller.js
import Cart from "../Model/cart.model.js";
import mongoose from "mongoose";

// Create or update a cart
export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Validate required fields
  if (!userId || !productId || quantity == null) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Check if userId and productId are valid MongoDB ObjectIds
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(productId)
  ) {
    return res.status(400).json({ message: "Invalid userId or productId" });
  }

  // Validate quantity
  if (quantity <= 0) {
    return res
      .status(400)
      .json({ message: "Quantity must be greater than zero" });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Check if the product is already in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // Update the quantity of the existing item
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add a new item to the cart
        cart.items.push({ productId, quantity });
      }
    } else {
      // Create a new cart for the user if one doesn't exist
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get the user's cart
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from req.params
    console.log("req.query", req.params);

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      
      return res
        .status(400)
        .json({ message: `invalid user ${userId}`, userId: userId });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Remove an item from the cart
export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the item
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCartItemQuantity = async (req, res) => {
  const { productId, quantity, userId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item and update its quantity
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
