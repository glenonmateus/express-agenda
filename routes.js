import express from "express";
import {
  index as contactIndex,
  register as contactRegister,
} from "./src/controllers/ContactController.js";
import { index as homeIndex } from "./src/controllers/HomeController.js";
import {
  login,
  index as loginIndex,
  register as loginRegister,
  logout,
} from "./src/controllers/LoginController.js";
import authMiddleware from "./src/middlewares/auth.js";

const route = express.Router();

route.get("/", authMiddleware, homeIndex);

route.get("/login", loginIndex);
route.post("/login", login);
route.post("/login/register", loginRegister);
route.get("/logout", logout);

route.get("/contato", authMiddleware, contactIndex);
route.post("/contato/register", authMiddleware, contactRegister);

export default route;
