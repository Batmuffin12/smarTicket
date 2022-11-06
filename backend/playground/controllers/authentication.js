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
const { connectFirestoreEmulator } = require("firebase/firestore");

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
    data.token = await generateAuthToken({ email: data.email });
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
        response: validUser.data,
      };
    }
    const { response } = await getAllEntities({ collectionName: "Users" });
    const dataUser = response.find((user) => {
      const result = bcrypt
        .compare(data.password, user.data.password)
        .then((res) => res);
      return result && data.email === user.data.email;
    });
    if (dataUser) {
      return {
        status: 200,
        response: dataUser,
      };
    }
    return {
      status: 400,
      response: "email or password isnt right!",
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
