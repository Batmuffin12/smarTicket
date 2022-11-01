require("dotenv").config();
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const date = () => {
  return Date.now();
};

const token = jwt.sign({ email: "ofek@gmail.com" }, process.env.JSON_TOKEN);
console.log(token);

console.log(date());
bycrypt.hash("thisismytoken", 10).then((hash) => {
  console.log(hash);
});

module.exports = date;
