import validator from "validator";

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.validate(event);
    });
  }

  validate(event) {
    const element = event.target;
    const emailInput = element.querySelector('input[name="email"]');
    const passwordInput = element.querySelector('input[name="password"]');
    let error = false;

    if (!validator.isEmail(emailInput.value)) {
      alert("email inválido");
      error = true;
    }

    if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
      alert("senha inválida");
      error = true;
    }

    if (!error) {
      element.submit();
    }
  }
}
