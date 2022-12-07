const config = require("../../config.json");
const { admin } = require("../firebase/admin");

const fixTimeStampObject = (object, keys = config.timeStampKeys) => {
  const fixedObject = { ...object };
  for (const key of keys) {
    if (key.includes(".")) {
      const [firstKey, ...restKeys] = key.split(".");
      fixedObject[firstKey] = fixTimeStampObject(object[firstKey], restKeys);
    } else {
      if (
        object[key] &&
        (typeof object[key] === "string" || typeof object[key] === "number")
      ) {
        fixedObject[key] = admin.firestore.Timestamp.fromDate(
          new Date(object[key])
        );
      }
    }
  }

  return fixedObject;
};

module.exports = fixTimeStampObject;
