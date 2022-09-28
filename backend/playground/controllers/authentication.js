const { isEmailValid, isCreditCard } = require("../utils/serverUtils");
const { admin, db } = require("../firebase/admin");
const fixTimeStampObject = require("../utils/fixTimeStampObject");

const register = async ({ body }) => {
  try {
    if (
      !isEmailValid(body.data.email) &&
      !isCreditCard(body.data.isCreditCard.cardNum)
    ) {
      return {
        status: 400,
        message: "Email or password is not valid",
      };
    }
    const userJson = fixTimeStampObject(body.data);
    // TODO: create register api
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

const logIn = async () => {
  try {
    // TODO: create log in api
  } catch (e) {
    return {
      status: 500,
      response: e,
    };
  }
};

module.exports = {
  createUser,
  deleteUser,
  patchUser,
  getSingularUser,
  getAllUsers,
};
