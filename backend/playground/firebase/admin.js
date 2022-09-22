const admin = require("firebase-admin");
const credentials = require("../../key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL:
    "https://smarticket-16464-default-rtdb.europe-west1.firebasedatabase.app",
});
const db = admin.firestore();

module.exports = {
  db,
  admin,
};
