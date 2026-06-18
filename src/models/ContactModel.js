import mongoose from "mongoose";
import validator from "validator";
import parsePhoneNumber from "libphonenumber-js";

const ContactSchema = mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String },
  phone: {
    type: String,
    validate: {
      validator: (value) => {
        if (value === "") return true;
        return parsePhoneNumber(value, "BR").isValid();
      },
      message: "Telefone inválido",
    },
  },
  email: {
    type: String,
    validate: {
      validator: (value) => {
        if (value === "") return true;
        return validator.isEmail(value);
      },
      message: "Email inválido",
    },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Login" },
  createAt: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model("Contact", ContactSchema);

class Contact {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
  }

  async register(owner) {
    if (this.errors.length > 0) return;
    this.body.owner = owner._id;
    try {
      this.contact = await ContactModel.create(this.body);
    } catch (error) {
      if (
        error.name === "ValidationError" &&
        error.errors.name?.path === "name"
      )
        this.errors.push("O campo nome é obrigatório");
      if (
        error.name === "ValidationError" &&
        error.errors.email?.path === "email"
      )
        this.errors.push("Email inválido");
      if (
        error.name === "ValidationError" &&
        error.errors.phone?.path === "phone"
      )
        this.errors.push("Telefone inválido");
      console.error(error);
    }
  }

  async findById(contactId) {
    try {
      this.contact = await ContactModel.findById(contactId);
    } catch (error) {
      console.error(error);
    }
  }

  static async update(contactId, contact) {
    try {
      return await ContactModel.findByIdAndUpdate({ _id: contactId }, contact);
    } catch (error) {
      console.error(error);
    }
  }

  static async remove(contactId) {
    try {
      return await ContactModel.deleteOne({ _id: contactId });
    } catch (error) {
      console.error(error);
    }
  }

  static async list(ownerId) {
    try {
      return await ContactModel.find({ owner: ownerId });
    } catch (error) {
      console.error(error);
    }
  }
}

export default Contact;
