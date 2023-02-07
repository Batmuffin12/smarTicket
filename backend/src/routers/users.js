const express = require("express");
const router = express.Router();
const { uploadUserImg, findUserByToken } = require("../controllers/users");

router.post("/Users/changeImg/:id", async (req, res) => {
  const { response, status } = await uploadUserImg({
    id: req.params.id,
    file: req.body.file,
  });
  res.status(status).send(response);
});

router.get("/Users/getUser/:token", async (req, res) => {
  const { status, response } = await findUserByToken({
    token: req.params.token,
  });
  res.status(status).send(response);
});

module.exports = router;
