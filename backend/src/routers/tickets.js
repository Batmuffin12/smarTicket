const express = require("express");
const router = express.Router();
const { buyTicket } = require("../controllers/tickets");
const multer = require("multer");
const { imageSettings } = require("../middleware/requestImageSettings");

router.post(
  "/tickets/buyTicket",
  multer(imageSettings).single("userFaceImg"),
  async (req, res) => {
    const { status, response } = await buyTicket({
      user: req.validUser,
      train: req.body.train,
      file: req.file,
    });
    res.status(status).send(response);
  }
);

module.exports = router;
