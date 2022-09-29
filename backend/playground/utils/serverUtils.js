const validator = require("validator");

const isEmailValid = (email) => validator.isEmail(email);
const isCreditCard = (creditCard) => validator.isCreditCard(creditCard);
module.exports = {
  isEmailValid,
  isCreditCard,
};
