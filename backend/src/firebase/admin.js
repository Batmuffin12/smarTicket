const admin = require("firebase-admin");
const { ref, uploadString } = require("firebase/storage");
require("dotenv").config();
const credentials = require("../../key.json");

const app = admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: process.env.DB_URL,
  storageBucket: process.env.STORAGE_BUCKET_URL,
});
const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = {
  db,
  admin,
  bucket,
  ref,
  uploadString,
};
