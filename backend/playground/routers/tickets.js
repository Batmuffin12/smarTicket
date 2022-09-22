const express = require("express");
const router = express.Router();
const {
  getAllTickets,
  getTicketSingular,
  createTicket,
  patchTicket,
  deleteTicket,
} = require("../controllers/tickets");

router.get("/tickets/all", async (req, res) => {
  const { status, response } = await getAllTickets();
  res.status(status).send(response);
});

router.get("/tickets/:id", async (req, res) => {
  const { status, response } = await getTicketSingular(req.body.id);
  res.status(status).send(response);
});

router.post("/tickets/create", async (req, res) => {
  const { status, response } = await createTicket(req.body);
  res.status(status).send(response);
});

router.patch("/tickets/update", async (req, res) => {
  const id = req.body.id;
  const update = {
    ...req.body.updates,
  };
  const { status, response } = await patchTicket(id, update);
  res.status(status).send(response);
});

router.delete("/tickets/:id", async (req, res) => {
  const id = req.params.id;
  const { status, response } = await deleteTicket(id);
  res.status(status).send(response);
});

module.exports = router;
