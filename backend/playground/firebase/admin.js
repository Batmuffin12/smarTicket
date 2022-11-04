const admin = require("firebase-admin");
const { query, where } = require("firebase/firestore");
const credentials = require("../../key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: process.env.DB_URL,
});
const db = admin.firestore();

module.exports = {
  db,
  admin,
  query,
  where,
};
