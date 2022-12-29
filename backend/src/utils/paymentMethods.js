const { admin } = require("../firebase/admin");

const validCreditCardTime = ({ cardValid }) =>
  cardValid.valueOf() > admin.firestore.Timestamp.now().valueOf();

const payment = ({ creditCard }) =>
  validCreditCardTime({ cardValid: creditCard.cardValid });

module.exports = { payment };
