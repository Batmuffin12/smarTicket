const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authentication");
const { auth } = require("../middleware/authMiddleware");

router.post("/login", auth, async ({ body }, res) => {
  const { response, status } = await login({
    data: body.data,
    validUser: body.validUser,
  });
  res.status(status).send(response);
});

router.post("/register", async (req, res) => {
  const { response, status } = await register({ data: req.body.data });
  res.status(status).send(response);
});

module.exports = router;
