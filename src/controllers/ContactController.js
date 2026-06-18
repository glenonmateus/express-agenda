import Contact from "../models/ContactModel.js";

const index = (request, response) => {
  const contact = {};
  return response.render("contact", { contact });
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
    request.session.contacts = await Contact.list(request.session.user._id);
    return response.redirect("/");
  } catch (error) {
    console.error(error);
    return response.render("404");
  }
};

const edit = async (request, response) => {
  try {
    if (!request.params.id) return;
    const contact = new Contact(request.body);
    await contact.findById(request.params.id);
    const contactInfo = contact.contact;
    return response.render("contact", { contact: contactInfo });
  } catch (error) {
    console.error(error);
    return response.render("404");
  }
};

const update = async (request, response) => {
  try {
    if (!request.params.id) return;
    await Contact.update(request.params.id, request.body);
    request.flash("success", "Contato atualizado com sucesso!");
    request.session.contacts = await Contact.list(request.session.user._id);
    return response.redirect("/");
  } catch (error) {
    console.error(error);
    return response.render("404");
  }
};

const remove = async (request, response) => {
  try {
    await Contact.remove(request.params.id);
    request.flash("success", "Contato removido com sucesso!");
    request.session.contacts = await Contact.list(request.session.user._id);
    return response.redirect("/");
  } catch (error) {
    console.error(error);
    return response.render("404");
  }
};

export { index, register, edit, remove, update };
