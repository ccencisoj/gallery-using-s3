const { Schema, model, Types } = require("mongoose");

const Profile = new Schema({
  image: {type: String, required: false},
  username: {type: String, required: true},
  description: {type: String, default: ""},
  tags: [{type: String}],
  nposts: {type: Number, default: 0},
  nfollowers: {type: Number, default: 0},
  nfollowing: {type: Number, default: 0},
  user: {type: Types.ObjectId, ref: "User", required: true},
});

Profile.set("toJSON", {
  transform: (document, returnedObject)=> {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = model("Profile", Profile);