class LoginError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.name = "LoginError";
  }

  toJSON = ()=> ({
    status: this.status,
    name: this.name,
    message: this.message
  })
}

module.exports = LoginError;