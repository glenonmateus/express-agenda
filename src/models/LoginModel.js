import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

const LoginSchema = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.check();
    if (this.errors.length > 0) {
      return;
    }
    try {
      const salt = bcryptjs.genSaltSync();
      this.body.password = bcryptjs.hashSync(this.body.password, salt);
      this.user = await LoginModel.create(this.body);
    } catch (error) {
      if (error.code === 11000) {
        this.errors.push("Email ja cadastrado");
      }
      console.error(error);
    }
  }

  check() {
    this.removeCsrfTokenFromBody();
    this.checkEmail();
    this.checkPassword();
  }

  checkEmail() {
    if (!validator.isEmail(this.body.email)) {
      this.errors.push("Email inválido");
    }
  }

  checkPassword() {
    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push("Password precisa ter entre 3 e 50 caracteres");
    }
  }

  removeCsrfTokenFromBody() {
    delete this.body._csrf;
  }
}

export { Login, LoginModel };
