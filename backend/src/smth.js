require("dotenv").config();
const bcrypt = require("bcrypt");

const date = () => {
  return Date.now();
};

console.log(date());

const db = {};
if (!db) {
  console.log("hello");
}

module.exports = date;
