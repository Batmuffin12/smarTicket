const { isEmailValid, isCreditCard } = require("../utils/serverUtils");
const { getAllEntities } = require("../controllers/generic");
const jwt = require("jsonwebtoken");

const checkEmailAndCreditCard = ({ email, cardNum }) =>
  isEmailValid(email) && isCreditCard(cardNum);

const isEmailExist = async ({ email }) => {
  const userArr = await getAllEntities({ collectionName: "Users" });
  const user = userArr.find((user) => user.email === email);
  if (user) {
    return false;
  }
  return true;
};

const isPasswordValid = ({ password }) => {
  return password.length > 6;
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
