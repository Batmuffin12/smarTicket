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
  const { status, response } = await createTrain(req.body);
  res.status(status).send(response);
});

router.patch("/trains/update", async (req, res) => {
  const id = req.body.id;
  const update = {
    ...req.body.updates,
  };
  const { status, response } = await patchTrain(id, update);
  res.status(status).send(response);
});

router.delete("/trains/:id", async (req, res) => {
  const id = req.params.id;
  const { status, response } = await deleteTrain(id);
  res.status(status).send(response);
});

module.exports = router;
