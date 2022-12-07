const { isEmail } = require("validator");
require("dotenv").config();
const { getAllEntities } = require("../controllers/generic");
const jwt = require("jsonwebtoken");

const checkEmailAndCreditCard = ({ email, cardNum }) => {
  const cardNumRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
  return isEmail(email) && cardNumRegex.test(cardNum);
};

const isEmailExist = async ({ email }) => {
  const { response } = await getAllEntities({ collectionName: "Users" });
  const user = response.find((user) => {
    return user.data.email === email;
  });
  if (user) {
    return true;
  }
  return false;
};

const isPasswordValid = ({ password }) => {
  // matches if pass is 6-20 length, has one numeric digit, one uppercase, one lowercase
  const passRegex = /^[A-Za-z]\w{7,14}$/;
  return password.match(passRegex);
};

const generateAuthToken = ({ email }) => {
  const token = jwt.sign({ email }, process.env.JSON_TOKEN);
  return token;
};

module.exports = {
  checkEmailAndCreditCard,
  isEmailExist,
  generateAuthToken,
  isPasswordValid,
};
