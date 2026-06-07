import { Login } from "../models/LoginModel.js";

const index = (request, response) => {
  response.render("login");
};

const login = (request, response) => {
  response.send(request.body);
};

const register = (request, response) => {
  const login = new Login(request.body);
  login.register();
  response.send(login.user);
};

export { index, login, register };
