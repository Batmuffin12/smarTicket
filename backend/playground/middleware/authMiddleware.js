const jwt = require("jsonwebtoken");
const { getAllEntities } = require("../controllers/generic");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JSON_TOKEN);
    const userArr = await getAllEntities({ collectionName });
    const user = userArr.find((user) => user.data.email === decoded.email);
    if (!user.empty) {
      req.body.user = user.data();
    }
    next();
  } catch (e) {
    res.status(401).send("Please authenticate");
  }
};

module.exports = {
  auth,
};
