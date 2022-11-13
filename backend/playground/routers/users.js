const express = require("express");
const router = express.Router();
const {
  createEntity,
  patchEntity,
  deleteEntity,
  getSingularEntity,
  getAllEntities,
} = require("../controllers/generic");
const { uploadUserImg } = require("../controllers/users");
const multer = require("multer");
const { imageSettings } = require("../middleware/users");

router.post("/users/create", async (req, res) => {
  const { status, response } = await createEntity({
    data: req.body.data,
    collectionName: "Users",
  });
  res.status(status).send(response);
});

router.get("/users/all", async (req, res) => {
  const { status, response } = await getAllEntities({
    collectionName: "Users",
  });
  res.status(status).send(response);
});

router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const { response, status } = await getSingularEntity({
    id,
    collectionName: "Users",
  });
  res.status(status).send(response);
});

router.patch("/users/update", async (req, res) => {
  const { status, response } = await patchEntity({
    id: req.body.data.id,
    updates: {
      ...req.body.data.updates,
    },
    collectionName: "Users",
  });
  return res.status(status).send(response);
});

router.post(
  "/users/changeImg/:id",
  multer(imageSettings).single("userFaceImg"),
  async (req, res) => {
    const { response, status } = await uploadUserImg({
      id: req.params.id,
      file: req.file,
    });
    res.status(status).send(response);
  }
);

router.delete("/users/:id", async (req, res) => {
  const { status, response } = await deleteEntity({
    id: req.params.id,
    collectionName: "Users",
  });
  res.status(status).send(response);
});

module.exports = router;
