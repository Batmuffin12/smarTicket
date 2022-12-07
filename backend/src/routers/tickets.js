const express = require("express");
const router = express.Router();
const {
  createEntity,
  patchEntity,
  deleteEntity,
  getSingularEntity,
  getAllEntities,
} = require("../controllers/generic");

router.get("/tickets/all", async (req, res) => {
  const { status, response } = await getAllEntities({
    collectionName: "Tickets",
  });
  res.status(status).send(response);
});

router.get("/tickets/:id", async (req, res) => {
  const { status, response } = await getSingularEntity({
    id: req.params.id,
    collectionName: "Tickets",
  });
  res.status(status).send(response);
});

router.post("/tickets/create", async (req, res) => {
  const { status, response } = await createEntity({
    data: req.body.data,
    collectionName: "Tickets",
  });
  res.status(status).send(response);
});

router.patch("/tickets/update", async (req, res) => {
  const { status, response } = await patchEntity({
    id: req.body.data.id,
    updates: {
      ...req.body.data.updates,
    },
    collectionName: "Tickets",
  });
  res.status(status).send(response);
});

router.delete("/tickets/:id", async (req, res) => {
  const { status, response } = await deleteEntity({
    id: require.params.id,
    collectionName: "Tickets",
  });
  res.status(status).send(response);
});

module.exports = router;