require("dotenv").config();
const bcrypt = require("bcrypt");
const date = () => {
  return Date.now();
};
console.log(process.env.JSON_TOKEN);
console.log(date());

module.exports = date;
