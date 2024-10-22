import userModel from "../Model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ user: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the new user
    const savedUser = await newUser.save();
    return res
      .status(201)
      .send({ message: "User registered successfully", user: savedUser });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export function login(req, res) {
  const { email, password } = req.body;

  userModel
    .findOne({ email })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "user is not registered" });
      }

      let isValidPassword = bcrypt.compareSync(password, data.password);

      if (!isValidPassword) {
        return res.status(403).send({ message: "Invalid Password" });
      }

      let token = jwt.sign({ id: data._id }, "IMBanty02@", {
        expiresIn: "50m",
      });

      res.send({
        user: {
          id: data._id,
          email: data.email,
          fullName: data.fullName,
        },
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}
