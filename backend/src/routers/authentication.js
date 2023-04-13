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
  const { imgType } = req.body;
  delete req.body.imgType;
  const { response, status } = await register({
    data: { ...req.body },
    imgType,
  });
  res.status(status).send(response);
});

module.exports = router;
