const express = require("express");
const router = express.Router();
const {
  createEntity,
  patchEntity,
  deleteEntity,
  getSingularEntity,
  getAllEntities,
} = require("../controllers/generic");
const { buyTicket } = require("../controllers/tickets");
const multer = require("multer");
const { imageSettings } = require("../middleware/requestImageSettings");

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

router.post(
  "/tickets/buyTicket",
  multer(imageSettings).single("userFaceImg"),
  async (req, res) => {
    const { status, response } = await buyTicket({
      user: req.validUser,
      train: req.body.train,
      file: req.file,
    });
    res.status(status).send(response);
  }
);

module.exports = router;
