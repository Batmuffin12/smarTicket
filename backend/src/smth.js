require("dotenv").config();
const bcrypt = require("bcrypt");

const date = () => {
  return Date.now();
};

const x = "abc123";
const y = async () => console.log(await bcrypt.hash(x, 10));
y();

module.exports = date;
