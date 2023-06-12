const mongoose = require("mongoose");
var webSchema = new mongoose.Schema({
  domainname: {
    type: String,
  },
  wordCount: {
    type: String,
  },
  favourite: {
    type: Boolean,
    default: false,
  },
  weblink: {
    type: String,
  },
});

mongoose.model("website_detail", webSchema);
