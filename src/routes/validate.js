const joi = require("joi");
const ValidationError = require("../errors/ValidationError");

const validate = {};

validate.body = (schema)=> {
  const joiSchema = joi.object(schema);

  return (req, res, next)=> {
    const result = joiSchema.validate(req.body);

    if(result.error) {
      const message = result.error.details[0].message;
      return next(new ValidationError(message));
    }
    
    next();
  } 
}

validate.query = (schema)=> {
  const joiSchema = joi.object(schema);

  return (req, res, next)=> {
    const result = joiSchema.validate(req.query);

    if(result.error) {
      const message = result.error.details[0].message;
      return next(new ValidationError(message));
    }
    
    next();
  } 
}

module.exports = validate;