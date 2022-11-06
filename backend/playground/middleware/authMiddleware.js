const jwt = require("jsonwebtoken");
require("dotenv").config();
const { getAllEntities } = require("../controllers/generic");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JSON_TOKEN);
    const { response } = await getAllEntities({ collectionName: "Users" });
    const validUser = response.find(
      (user) => user.data.email === decoded.email
    );
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
