const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const session = require("express-session");
const upload = require("multer")({ dest: "./uploads" });

const isProduction = process.env.NODE_ENV === "production";

app.use(cors({
  credentials: true,
  origin: ["http://192.168.100.6:3000"]
}));

app.use(session({ 
  secret: "cat", 
  resave: false, 
  cookie: {secure: false},
  saveUninitialized: false 
}));

app.use(express.static(__dirname + "/public"));
app.use(express.json({}));
app.use(routes);

app.use((error, req, res, next)=> {
  if(isProduction) {
    res.status(error.status || 500)
    .send(error.toJSON ? error.toJSON() : {
      status: 500,
      name: "UnknownError",
      message: "Unknown Error"
    });
  }else {
    res.status(error.status || 500)
    .send(error.toJSON ? error.toJSON() : {
      status: 500,
      name: error.name,
      message: error.message
    });
  }
});

module.exports = app;