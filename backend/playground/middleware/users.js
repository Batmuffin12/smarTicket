const multer = require("multer");

const userFaceImg = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/))
      return cb(new Error("please upload an image file"));
    cb(undefined, true);
  },
});

module.export = {
  userFaceImg,
};
