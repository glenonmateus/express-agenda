import express from "express";
import { home, submit } from "./src/controllers/HomeController.js";
import { contato } from "./src/controllers/ContatoController.js";

const route = express.Router();

route.get("/", home);
route.post("/", submit);

route.get("/contato", contato);

export default route;
