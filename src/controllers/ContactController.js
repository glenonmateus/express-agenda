import Contact from "../models/ContactModel.js";

const index = (request, response) => {
  return response.render("contact");
};

const register = async (request, response) => {
  try {
    const contact = new Contact(request.body);
    await contact.register(request.session.user);
    if (contact.errors.length > 0) {
      request.flash("errors", contact.errors);
      return response.redirect("/contato");
    }
    request.flash("success", "Contato cadastrado com sucesso!");
    return response.redirect("/");
  } catch (error) {
    console.error(error);
  }
};

const list = async (error, request, response) => {};

const edit = async (error, request, response) => {};

export { index, register, list, edit };
