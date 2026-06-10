import { Login } from "../models/LoginModel.js";

const index = (request, response) => {
  response.render("login");
};

const login = (request, response) => {
  response.send(request.body);
};

const register = async (request, response) => {
  try {
    const login = new Login(request.body);
    await login.register();
    if (login.errors.length > 0) {
      request.flash("errors", login.errors);
      request.session.save(function () {
        return response.redirect(303, request.get("Referer") || "/login");
      });
      return;
    }
    request.flash("success", "Cadastro realizado com sucesso!");
    request.session.save(function () {
      return response.redirect(303, request.get("Referer") || "/login");
    });
  } catch (error) {
    console.error(error);
    return response.send("404");
  }
};

export { index, login, register };
