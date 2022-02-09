const types = require("../types");
const auth = require("../auth");
const validate = require("../validate");
const router = require("express").Router();
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const LoginError = require("../../errors/LoginError");

router.post("/create", 
  validate.body({
    username: types.username().required(true),
    email: types.email().required(true),
    password: types.password().required(true),
  }), async (req, res)=> {

  const user = await User.create({
    email: req.body.email,
    password: req.body.password
  });

  const profile = await Profile.create({
    user: user.id,    
    username: req.body.username
  });

  user.profile = profile;

  await user.save();

  req.session.user = user.sessionJSON(
    profile.username
  );

  return res.json({ user: req.session.user });
});

router.post("/login", 
  validate.body({
    password: types.password().required(true),
    email: types.email().required(true)
  }), async (req, res)=> {
  
  const user = await User.findOne(req.body);
  
  if(!(user)) 
    throw new LoginError("email or password isn't true");

  const profile = await Profile.findOne({user: user.id});
  req.session.user = user.sessionJSON(profile.username);

  return res.json({ user: req.session.user });
});

router.get("/user", auth.optional, (req, res)=> {
  res.json({user: req.payload.user});
});

router.get("/profile", 
  auth.required, async (req, res)=> {
  
  const profile = await Profile.findOne({
    user: req.payload.user.id
  }).populate("user");

  return res.json({ profile });
}); 

module.exports = router;