const multer = require("multer");
const s3 = require("../config/s3");
const multerS3 = require("multer-s3");

const storage = multerS3({
  s3,
  bucket: "123-demo-bucket",
  key: (req, file, cb)=> {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
})

module.exports = multer({ storage }); 
