const { Schema, model, Types } = require("mongoose");
const Profile = require("./Profile");

const User = new Schema({
  password: {type: String, required: true},
  email: {type: String, required: true},
  profile: {type: Types.ObjectId, ref: "Profile"}
});

User.set("toJSON", {
  transform: (document, returnedObject)=> {
    returnedObject.id = returnedObject._id;
    delete returnedObject.password;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

User.methods.sessionJSON = function(username) {
  return {id: this._id, email: this.email, username};
}

module.exports = model("User", User);