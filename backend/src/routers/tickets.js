const express = require("express");
const router = express.Router();
const { buyTicket } = require("../controllers/tickets");
const multer = require("multer");
const { imageSettings } = require("../middleware/requestImageSettings");
const { auth } = require("../middleware/authMiddleware");

router.post(
  "/tickets/buyTicket",
  multer(imageSettings).single("userFaceImg"),
  auth,
  async (req, res) => {
    const { status, response } = await buyTicket({
      user: req.validUser,
      tripId: req.body.tripId,
      file: req.file,
    });
    res.status(status).send(response);
  }
);

module.exports = router;
