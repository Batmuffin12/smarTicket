const express = require("express");
const app = express();
const router = app.Router();
const { createUser } = require("../controllers/users");

router.post("/users/create", async (req, res) => {
  const { status, response } = await createUser(req.body);
  res.status(status).send(response);
});

router.get("/users/all", async (req, res) => {
  const { status, response } = await getAllUsers();
  res.status(status).send(response);
});

router.get("/users/:id", async (req, res) => {
  const { status, response } = getSingularUser(req.body.id);
  res.status(status).send(response);
});

router.patch("/users/update", async (req, res) => {
  const { status, response } = await patchUser({
    id: req.body.id,
    updates: {
      ...req.body.updates,
    },
  });
  res.status(status).send(response);
});

router.delete("/users/:id", async (req, res) => {
  const { status, response } = await awaitdeleteUser(req.body.id);
  res.status(status).send(response);
});

module.exports = router;
