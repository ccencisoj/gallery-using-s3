const mongoose = require("mongoose");
const app = require("./app");
const ip = require("ip");
const port = process.env.PORT;

global.host = "http://" + ip.address() + ":" + port;

mongoose.connect(`${process.env.MONGO_DB_SERVER}/gallery`)
.then(()=> {
  app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`);
  });
})
.catch((error)=> {
  console.log(error);
});