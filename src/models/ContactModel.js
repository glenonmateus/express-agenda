import mongoose from "mongoose";
import validator from "validator";
import parsePhoneNumber from "libphonenumber-js";

const ContactSchema = mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String },
  phone: {
    type: String,
    validate: {
      validator: (value) => parsePhoneNumber(value, "BR").isValid(),
      message: "Número de telefone inválido",
    },
  },
  email: {
    type: String,
    validate: { validator: (value) => validator.isEmail(value) },
    message: "Email inválido",
  },
});

const ContactModel = mongoose.model("Contact", ContactSchema);

class Contact {
  constructor(body) {
    this.body = body;
    this.errors = [];
  }
  async create() {
    return await ContactModel.create(this.body);
  }
  async update() {}
  async delete() {}
  async contacts() {
    return await ContactModel.find({});
  }
}

export { Contact };
