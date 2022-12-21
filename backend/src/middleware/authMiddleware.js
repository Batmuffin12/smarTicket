const jwt = require("jsonwebtoken");
const { getAllEntities } = require("../controllers/generic");
require("dotenv").config();
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const { email } = jwt.verify(token, process.env.JSON_TOKEN);
    const { response } = await getAllEntities({ collectionName: "Users" });
    const validUser = response.find((user) => user.data.email === email);
    if (!validUser.empty) {
      req.body.validUser = {
        ...validUser,
      };
    }
    next();
  } catch (e) {
    next();
    // res.status(401).send("Please authenticate");
  }
};

module.exports = {
  auth,
};
