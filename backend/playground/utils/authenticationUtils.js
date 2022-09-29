const { isEmailValid, isCreditCard } = require("../utils/serverUtils");

const checkEmailAndCreditCard = ({ email, cardNum }) => {
  if (!isEmailValid(email) && !isCreditCard(cardNum)) {
    return false;
  }
  return true;
};

const isEmailExist = async ({ email }) => {
  const userArr = getAllEntities({ collectionName: "Users" });
  userArr.filter((user) => user.email === email);
  if (userArr.length > 0) {
    return false;
  }
  return true;
};

module.exports = {
  checkEmailAndCreditCard,
  isEmailExist,
};
