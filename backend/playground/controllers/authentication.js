const {
  checkEmailAndCreditCard,
  isEmailExist,
  generateAuthToken,
} = require("../utils/authenticationUtils");
const bcrypt = require("bcrypt");
const { getAllEntities } = require("./generic");
const { db } = require("../firebase/admin");
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
    if (!isPasswordMValid({ password: data.password })) {
      return {
        status: 406,
        message: "password invalid, password length must be 6 or more!",
      };
    }
    data.password = await bcrypt.hash(data.password, 10);
    data.token = generateAuthToken({ email: data.email });
    const userJson = fixTimeStampObject(data);
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

const login = async ({ data, user }) => {
  try {
    if (user) {
      return {
        status: 200,
        response: user,
      };
    }
    const userArr = await getAllEntities({ collectionName: "Users" });
    const dataUser = userArr.find(async (user) => {
      const isPasswordMatch = await bcrypt.compare(
        data.password,
        user.password
      );
      return user.email === data.email && isPasswordMatch;
    });
    if (!dataUser) {
      return {
        status: 400,
        response: "email or password isnt right!",
      };
    }
    return {
      status: 200,
      response: dataUser,
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
