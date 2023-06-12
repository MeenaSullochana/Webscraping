const express = require("express");
const { default: mongoose } = require("mongoose");
var router = express.Router();
const {
  addRecord,
  getRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/webscrapeController");

router.get("/", (req, res) => {
  res.render("website/addWebsite");
});

router.post("/", addRecord);

router.get("/list", getRecord);

router.get("/:id", updateRecord);

router.get("/delete/:id", deleteRecord);

module.exports = router;
