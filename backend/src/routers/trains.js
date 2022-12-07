const express = require("express");
const router = express.Router();
const {
  createEntity,
  patchEntity,
  deleteEntity,
  getSingularEntity,
  getAllEntities,
} = require("../controllers/generic");

router.get("/trains/all", async (req, res) => {
  const { status, response } = await getAllEntities({
    collectionName: "Trains",
  });
  res.status(status).send(response);
});

router.get("/trains/:id", async (req, res) => {
  const { status, response } = await getSingularEntity({
    id: req.params.id,
    collectionName: "Trains",
  });
  res.status(status).send(response);
});

router.post("/trains/create", async (req, res) => {
  const { status, response } = await createEntity({
    data: req.body.data,
    collectionName: "Trains",
  });
  res.status(status).send(response);
});

router.patch("/trains/update", async (req, res) => {
  const { status, response } = await patchEntity({
    id: req.body.data.id,
    updates: {
      ...req.body.data.updates,
    },
    collectionName: "Trains",
  });
  res.status(status).send(response);
});

router.delete("/trains/:id", async (req, res) => {
  const { status, response } = await deleteEntity({
    id: require.params.id,
    collectionName: "Trains",
  });
  res.status(status).send(response);
});

module.exports = router;
