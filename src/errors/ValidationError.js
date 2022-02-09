class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.name = "ValidationError";
  }

  toJSON = ()=> ({
    status: this.status,
    name: this.name,
    message: this.message
  })
}

module.exports = ValidationError;