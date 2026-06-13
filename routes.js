import express from "express";
import { index as homeIndex } from "./src/controllers/HomeController.js";
import {
  index as loginIndex,
  login,
  logout,
  register,
} from "./src/controllers/LoginController.js";
import { index as contactIndex } from "./src/controllers/ContactController.js";
import authMiddleware from "./src/middlewares/auth.js";

const route = express.Router();

route.get("/", authMiddleware, homeIndex);

route.get("/login", loginIndex);
route.post("/login", login);
route.post("/login/register", register);
route.get("/logout", logout);

route.get("/contato", authMiddleware, contactIndex);

export default route;
