import { register, login } from "../Controller/user.controller.js";

export async function userRouter(app) {
  app.post("/api/user", register);
  app.post("/api/login", login);
}
