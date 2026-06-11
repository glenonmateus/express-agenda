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
        this.errors.push("Email já cadastrado");
      }
      console.error(error);
    }
  }

  async login() {
    this.check();
    if (this.errors.length > 0) {
      return;
    }
    try {
      await this.verifyEmail(this.body.email);
      const passwordIsMatch = await this.verifyPassword(
        this.body.password,
        this.user?.password,
      );
      if (!this.user || !passwordIsMatch) {
        this.errors.push("Usuário e/ou Senha não conferem");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async verifyEmail(email) {
    try {
      this.user = await LoginModel.findOne({ email: email });
    } catch (error) {
      console.error(error);
    }
  }

  async verifyPassword(password, storeHash = "") {
    try {
      return await bcryptjs.compare(password, storeHash);
    } catch (error) {
      console.error(error);
    }
  }

  check() {
    // this.removeCsrfTokenFromBody();
    this.checkInputEmail();
    this.checkInputPassword();
  }

  checkInputEmail() {
    if (!validator.isEmail(this.body.email)) {
      this.errors.push("Email inválido");
    }
  }

  checkInputPassword() {
    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push("Password precisa ter entre 3 e 50 caracteres");
    }
  }
}

export { Login, LoginModel };
