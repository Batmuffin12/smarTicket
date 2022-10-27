const {
  checkEmailAndCreditCard,
  isEmailExist,
} = require("../utils/authenticationUtils");
const bcrypt = require("bcrypt");
const { getAllEntities } = require("./generic");
const { admin, db } = require("../firebase/admin");
const fixTimeStampObject = require("../utils/fixTimeStampObject");

const register = async ({ data }) => {
  try {
    if (
      !checkEmailAndCreditCard({
        email: data.email,
        creditCard: data.creditCard.cardNum,
      })
    ) {
      return { status: 400, response: "email or creditCard isn't valid" };
    }
    if (!isEmailExist({ email: data.email })) {
      return {
        status: 406,
        message: "Email already exists",
      };
    }
    body.data.password = await bcrypt.hash(data.password, 10);
    const userJson = fixTimeStampObject(data);
    // TODO: create register api - JSON tokens
    const response = db.collection("Users").add(userJson);
    return {
      status: 201,
      response,
    };
  } catch (e) {
    return {
      status: 500,
      response: e,
    };
  }
};

const logIn = async ({ data }) => {
  try {
    // TODO: create log in api - create JSON tokens
    const userArr = await getAllEntities({ collectionName: "Users" });
    userArr.filter(async (user) => {
      const isPassValid = await bcrypt.compare(data.password, user.password);
      return user.email === data.email && isPassValid;
    });
    return {
      status: 200,
      response: "log in success!",
    };
  } catch (e) {
    return {
      status: 500,
      response: e,
    };
  }
};

module.exports = {
  register,
  logIn,
};
