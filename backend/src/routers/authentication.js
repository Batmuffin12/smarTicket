const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authentication");
const { auth } = require("../middleware/authMiddleware");

router.post("/login", auth, async ({ body, validUser }, res) => {
  const { response, status } = await login({
    data: body,
    validUser: validUser,
  });
  res.status(status).send(response);
});

router.post("/register", async (req, res) => {
  delete req.body.confirmPassword;
  const { response, status } = await register({ data: { ...req.body } });
  res.status(status).send(response);
});

module.exports = router;
