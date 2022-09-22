const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const { isEmailValid } = require("../../src/utils/serverUtils");

router.get("/tickets/all", async (req, res) => {
  const { status, response } = await getAllTickets();
  res.status(status).send(response);
});

router.get("/tickets/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const ticketsRef = db.collection("Tickets").doc(id);
    const response = await ticketsRef.get();
    if (response.data) {
      res.status(200).send(response.data());
    } else {
      throw new Error("no data found");
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/tickets/create", async (req, res) => {
  try {
    const ticketJson = {
      ...req.body.ticket,
      validUntil: admin.firestore.Timestamp.fromDate(
        new Date(req.body.ticket.validUntil)
      ),
    };

    const response = await db.collection("Tickets").add(ticketJson);
    res.status(201).send(response);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/tickets/update", async (req, res) => {
  try {
    const id = req.body.id;
    const update = {
      ...req.body.updates,
    };
    const response = await db.collection("Tickets").doc(id).update(update);
    res.status(200).send(response);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/tickets/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await db.collection("Tickets").doc(id).delete();
    res.status(200).send(response);
  } catch (e) {
    res.status(500).send(e);
  }
});
