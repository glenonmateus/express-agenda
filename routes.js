import express from "express";
import { index as homeIndex } from "./src/controllers/HomeController.js";
import {
  index as loginIndex,
  login,
  logout,
  register,
} from "./src/controllers/LoginController.js";

const route = express.Router();

route.get("/", homeIndex);

route.get("/login", loginIndex);
route.post("/login", login);
route.post("/login/register", register);
route.get("/logout", logout);

export default route;
