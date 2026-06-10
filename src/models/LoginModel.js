import mongoose from "mongoose";
import validator from "validator";

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

  register() {
    this.check();
    if (this.errors.length > 0) {
      return;
    }
    this.user = new LoginModel(this.body);
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
