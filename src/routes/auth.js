const AuthError = require("../errors/AuthError");

const required = (req, res, next)=> {
  const user = req.session.user;

  if(!(user)) 
    return next(new AuthError("El usuario debe iniciar session"));

  req.payload = {user};
  next();  
}

const optional = (req, res, next)=> {
  const user = req.session.user;
  req.payload = {user};
  next();
}

module.exports = { required, optional };