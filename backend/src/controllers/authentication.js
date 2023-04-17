const {
  isEmailExist,
  generateAuthToken,
  uploadFile,
} = require("../utils/authenticationUtils");
const { sendWelcomeMail } = require("../emails/account");
const bcrypt = require("bcrypt");
const { getAllEntities } = require("./generic");
const { db } = require("../firebase/admin");
const fixTimeStampObject = require("../utils/fixTimeStampObject");
const { findUserByToken } = require("./users");

const register = async ({ data, imgType }) => {
  try {
    if (await isEmailExist({ email: data.email })) {
      return {
        status: 406,
        response: "Email already exists",
      };
    }
    data.password = await bcrypt.hash(data.password, 10);
    data.token = generateAuthToken({ email: data.email });
    data.img = data.img.split(",")[1];
    const filePath = await uploadFile(data, imgType);
    if (!filePath) {
      return {
        status: 500,
        response: "file didn't upload successfully pls try again",
      };
    }
    data.img = filePath;
    const userJson = fixTimeStampObject(data);
    db.collection("Users").add(userJson);
    sendWelcomeMail(data.email);
    return findUserByToken({ token: data.token });
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
