const express = require("express");
const router = express.Router();
const {
  createEntity,
  patchEntity,
  deleteEntity,
  getSingularEntity,
  getAllEntities,
  deleteManyEntities,
} = require("../controllers/generic");

router.get("/:model/:id*?", async (req, res) => {
  let status, response;
  const collectionName = req.params.model;
  if (req.params.id) {
    const responseData = await getSingularEntity({
      id: req.params.id,
      collectionName,
    });
    status = responseData.status;
    response = responseData.response;
  } else {
    const responseData = await getAllEntities({
      collectionName,
    });
    status = responseData.status;
    response = responseData.response;
  }
  res.status(status).send(response);
});

router.post("/:model/create", async (req, res) => {
  console.log(req.body);
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

router.delete("/:model", async (req, res) => {
  if (!Array.isArray(req.query.id)) {
    const { status, response } = await deleteEntity({
      id: req.query.id,
      collectionName: req.params.model,
    });
    res.status(status).send(response);
  } else {
    const { status, response } = await deleteManyEntities({
      collectionName: req.params.model,
      entities: req.query.id,
    });
    res.status(status).send(response);
  }
});

module.exports = router;
