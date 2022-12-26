const validCreditCardTime = ({ cardValid }) => cardValid > Date.now();

const payment = ({ creditCard }) =>
  validCreditCardTime({ cardValid: creditCard.cardValid });

module.exports = { payment };
