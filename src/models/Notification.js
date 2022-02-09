const { Schema, model, Types } = require("mongoose");

const Notification = new Schema({
  transmitter: {type: Types.ObjectId, ref: "User", required: true},
  receiver: {type: Types.ObjectId, ref: "User", required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  seen: {type: Boolean, default: false},
  date: {type: Date, default: ()=> Date.now()}
});

Notification.set("toJSON", {
  transform: (document, returnedObject)=> {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = model("Notification", Notification);