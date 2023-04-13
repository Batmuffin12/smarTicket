const express = require("express");
const router = express.Router();
const { buyTicket } = require("../controllers/tickets");
const { auth } = require("../middleware/authMiddleware");

router.post("/tickets/buyTicket", auth, async (req, res) => {
  console.log(req.validUser);
  const { status, response } = await buyTicket({
    user: req.validUser,
    tripId: req.body.tripId,
  });
  res.status(status).send(response);
});

module.exports = router;
