const sharp = require("sharp");
const { db } = require("../firebase/admin");
const { callToPythonApi } = require("../python/callToApi");

//FIXME: use python file

const uploadUserImg = async ({ file, id }) => {
  try {
    const buffer = await sharp(file.buffer)
      .resize({
        width: 250,
        height: 250,
      })
      .png()
      .toBuffer();

    const result = await callToPythonApi("test.py", []);
    // TODO: finish this
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
};