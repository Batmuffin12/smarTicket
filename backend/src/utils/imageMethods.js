const sharp = require("sharp");

const fixImg = async ({ buffer }) => {
  const fixedImg = await sharp(buffer)
    .resize({
      width: 250,
      height: 250,
    })
    .png()
    .toBuffer();
  return fixedImg;
};

module.exports = {
  fixImg,
};
