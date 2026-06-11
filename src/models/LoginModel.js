import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

const LoginSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) => validator.isEmail(value),
    },
  },
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
    this.checkFormInputPassword();
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
      if (error.name === "ValidationError") {
        this.errors.push("Email inválido");
      }
      console.error(error);
    }
  }

  async login() {
    this.checkFormInputPassword();
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
      return bcryptjs.compareSync(password, storeHash);
    } catch (error) {
      console.error(error);
    }
  }

  checkFormInputPassword() {
    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push("Password precisa ter entre 3 e 50 caracteres");
    }
  }
}

export { Login, LoginModel };
