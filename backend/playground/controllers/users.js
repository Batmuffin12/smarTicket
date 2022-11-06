const sharp = require("sharp");
const { patchEntity } = require("./generic");

const uploadUserImg = async ({ file, id }) => {
  try {
    //FIX ME: buffer not converting right
    const buffer = await sharp(file.buffer)
      .resize({
        width: 250,
        height: 250,
      })
      .png()
      .toBuffer();
    console.log(buffer);
    const response = await patchEntity({
      id,
      updates: {
        image: buffer,
      },
      collectionName: "Users",
    });
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
