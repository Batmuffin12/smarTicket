const express = require("express");
const router = express.Router();
const {
  createEntity,
  patchEntity,
  deleteEntity,
  getSingularEntity,
  getAllEntities,
} = require("../controllers/generic");

router.get("/:model/all", async (req, res) => {
  const { status, response } = await getAllEntities({
    collectionName: req.params.model,
  });
  res.status(status).send(response);
});

router.get("/:model/:id", async (req, res) => {
  const { status, response } = await getSingularEntity({
    id: req.params.id,
    collectionName: req.params.model,
  });
  res.status(status).send(response);
});

router.post("/:model/create", async (req, res) => {
  const { status, response } = await createEntity({
    data: req.body.data,
    collectionName: req.params.model,
  });
  res.status(status).send(response);
});

router.patch("/:model/update", async (req, res) => {
  const { status, response } = await patchEntity({
    id: req.body.data.id,
    updates: {
      ...req.body.data.updates,
    },
    collectionName: req.params.model,
  });
  res.status(status).send(response);
});

router.delete("/:model/:id", async (req, res) => {
  const { status, response } = await deleteEntity({
    id: require.params.id,
    collectionName: req.params.model,
  });
  res.status(status).send(response);
});

module.exports = router;
