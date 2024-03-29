const { db } = require("../firebase/admin");
const { callToPythonApi } = require("../python/callToApi");
const jwt = require("jsonwebtoken");
const { getAllEntities } = require("./generic");
const { fixImg } = require("../utils/imageMethods");

//FIXME: use python file

const findUserByToken = async ({ token }) => {
  try {
    const { response } = await getAllEntities({ collectionName: "Users" });
    const validUser = response.find((user) => user.data.token === token);
    if (!validUser) {
      return {
        response: "no user found",
        status: 404,
      };
    } else {
      return {
        response: validUser,
        status: 200,
      };
    }
  } catch (e) {
    return {
      status: 500,
      response: e,
    };
  }
};

// TODO: add station id and isEntryOrExit in params and add 1 to counter of that station by isEntryOrExit
const uploadUserImg = async ({ file, id }) => {
  try {
    const buffer = fixImg(file.buffer);
    const result = await callToPythonApi("test.py", [buffer]);
    const response = await db
      .collection("Users")
      .doc(id)
      .update({ image: buffer });
    return {
      status: 200,
      response,
    };
  } catch (e) {
    return {
      status: 500,
      response: e,
    };
  }
};

module.exports = {
  uploadUserImg,
  findUserByToken,
};
