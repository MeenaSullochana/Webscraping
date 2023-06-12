const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Meenakshi:Meena123@cluster0.2qr4ijs.mongodb.net/websc",
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("Mongo Connection Succeed");
    } else console.log("Error in mongo connection " + err);
  }
);

require("./website.model");
