const { Schema, model, Types } = require("mongoose");
const s3 = require("../config/s3");

const Image = new Schema({
  key: {type: String, required: true},
  public: {type: Boolean, default: true},
  publisher: {type: Types.ObjectId, ref: "User", required: true},
  date: {type: Date, default: ()=> Date.now()},
  likes: {type: Number, default: 0}
});

Image.set("toJSON", {
  transform: (document, returnedObject)=> {
    
    returnedObject.url = s3.getSignedUrl("getObject", {
      Expires: 120,
      Key: returnedObject.key,
      Bucket: "123-demo-bucket",
    });

    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.key;
  }
})

module.exports = model("Image", Image);