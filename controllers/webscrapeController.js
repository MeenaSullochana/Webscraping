const express = require("express");
const { default: mongoose } = require("mongoose");
const axios = require("axios");
const Website = mongoose.model("website_detail");
const URL = require('url');
const { hostname } = require("os");

exports.addRecord = async (req, res) => {
  var web = new Website();
  const url = req.body.domainname;
  const content = await getcontent(url);
  const cleanedContent = convertcontent(content);
  const result = count(cleanedContent);
  const wordcount = Object.keys(result).length;

const websiteurl = URL.parse(url,true);
const websitename= websiteurl.protocol+"//"+websiteurl.hostname;

  web.domainname = websitename;
  web.wordCount = wordcount;
  web.weblink = websiteurl.href;
  web.save((err, doc) => {
    if (!err) {
      res.redirect("/website/list");
     
    } else {
      console.log("There is some error in storing data" + err);
    }
  });
};

function getcontent(url) {
  return axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function convertcontent(content) {
  const alphabet = content
    .toString()
    .replace(/[^A-Za-z']+/g, " ")
    .trim();
  const lowerCase = alphabet.toLowerCase();
  return lowerCase;
}

function count(data) {
  let record = {};
  const words = data.split(" ").filter((word) => word !== "");

  for (let i = 0; i < words.length; i++) {
    const item = words[i];
    record[item] = record[item] + 1 || 1;
  }
  return record;
}

exports.getRecord = (req, res) => {
  Website.find((err, docs) => {
    if (!err) {
      res.render("website/listview", {
        list: docs,
      });
    } else {
      console.log("Error :" + err);
    }
  });
};

exports.updateRecord = (req, res) => {
  Website.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { favourite: true } },
    (err, doc) => {
      if (!err) {
        res.redirect("list");
      } else {
        console.log("Error :" + err);
      }
    }
  );
};

exports.deleteRecord = (req, res) => {
  Website.findByIdAndRemove({ _id: req.params.id }, (err, doc) => {
    if (!err) {
      res.redirect("/website/list");
    } else {
      console.log("Error :" + err);
    }
  });
};
