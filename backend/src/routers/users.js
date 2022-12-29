const express = require("express");
const router = express.Router();
const { uploadUserImg, findUserByToken } = require("../controllers/users");
const multer = require("multer");
const { imageSettings } = require("../middleware/requestImageSettings");

router.post(
  "/users/changeImg/:id",
  multer(imageSettings).single("userFaceImg"),
  async (req, res) => {
    const { response, status } = await uploadUserImg({
      id: req.params.id,
      file: req.file,
    });
    res.status(status).send(response);
  }
);

router.get("/users/getUser/:token", async (req, res) => {
  const { status, response } = await findUserByToken({
    token: req.params.token,
  });
  res.status(status).send(response);
});

module.exports = router;
