import express from "express";
import mongoose from "mongoose";
import { routes } from "./Routes/product.routes.js";
import { userRouter } from "./Routes/user.routes.js";
import cors from "cors"; // Import the cors package
import cartroutes from "./Routes/cart.routes.js";

const app = new express();

app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

app.listen(5000, () => {
  console.log("hello");
});

mongoose.connect("mongodb://localhost:27017/imtiyajDB");

const db = mongoose.connection;

db.on("open", () => {
  console.log("connected succesfully");
});
db.on("error", () => {
  console.log("error throws  succesfully");
});

routes(app);
userRouter(app);
cartroutes(app);
