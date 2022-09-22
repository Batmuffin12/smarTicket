const express = require("express");
const router = express.Router();
const {
  createEntity,
  patchEntity,
  deleteEntity,
  getSingularEntity,
  getAllEntities,
} = require("../controllers/generic");
const { getSingularUser } = require("../controllers/users");

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
  const { status, response } = getSingularUser(req.params.id);
  res.status(status).send(response);
});

router.patch("/users/update", async (req, res) => {
  const { status, response } = await patchEntity({
    id: req.body.id,
    updates: {
      ...req.body.updates,
    },
    collectionName: "Users",
  });
  return res.status(status).send(response);
});

router.delete("/users/:id", async (req, res) => {
  const { status, response } = await deleteEntity({
    id: req.params.id,
    collectionName: "Users",
  });
  res.status(status).send(response);
});

module.exports = router;
