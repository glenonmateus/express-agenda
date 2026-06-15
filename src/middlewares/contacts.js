import Contact from "../models/ContactModel.js";

const contactsMiddleware = async (request, response, next) => {
  try {
    response.locals.contacts = await Contact.list(request.session.user._id);
    next();
  } catch (error) {
    console.error(error);
  }
};

export default contactsMiddleware;
