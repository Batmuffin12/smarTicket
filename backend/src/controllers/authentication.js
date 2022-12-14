const {
  isPasswordValid,
  checkEmailAndCreditCard,
  isEmailExist,
  generateAuthToken,
} = require("../utils/authenticationUtils");
const { sendWelcomeMail } = require("../emails/account");
const bcrypt = require("bcrypt");
const { getAllEntities } = require("./generic");
const { db } = require("../firebase/admin");
const fixTimeStampObject = require("../utils/fixTimeStampObject");

const register = async ({ data }) => {
  try {
    if (
      !checkEmailAndCreditCard({
        email: data.email,
        cardNum: data.creditCard.cardNum,
      })
    ) {
      return { status: 400, response: "email or creditCard isn't valid" };
    }
    if (!isPasswordValid({ password: data.password })) {
      return {
        status: 406,
        response: "password invalid, password length must be 6 or more!",
      };
    }
    if (await isEmailExist({ email: data.email })) {
      return {
        status: 406,
        response: "Email already exists",
      };
    }
    data.password = await bcrypt.hash(data.password, 10);
    data.token = generateAuthToken({ email: data.email });
    const userJson = fixTimeStampObject(data);
    await db.collection("Users").add(userJson);
    sendWelcomeMail(data.email);
    return {
      status: 201,
      response: {
        token: userJson.token,
        message: "user Created successfully",
      },
    };
  } catch (e) {
    return {
      status: 500,
      response: e,
    };
  }
};

const login = async ({ data, validUser }) => {
  try {
    if (validUser) {
      return {
        status: 200,
        response: validUser,
      };
    }
    const { response } = await getAllEntities({ collectionName: "Users" });
    let dataUser;
    let result;
    for (let i = 0; i < response.length; i++) {
      result = await bcrypt.compare(data.password, response[i].data.password);
      if (result && data.email === response[i].data.email) {
        dataUser = response[i];
        break;
      }
    }
    if (dataUser) {
      return {
        status: 200,
        response: dataUser,
      };
    }
    return {
      status: 400,
      response: "email or password isn't right!",
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
  login,
};
