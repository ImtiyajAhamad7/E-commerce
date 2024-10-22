import jwt from "jsonwebtoken";
import userModel from "../Model/user.model.js";

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("JWT ")) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "IMBanty02@", (err, userData) => {
      if (err) {
        return res.status(403).json({ message: "Invalid JSON Token" });
      }

      userModel
        .findById(userData.id)
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          req.user = user;
          next();
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    });
  } else {
    res.status(403).json({ message: "Token not present" });
  }
}
