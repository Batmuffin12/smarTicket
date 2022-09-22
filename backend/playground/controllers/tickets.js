const { admin, db } = require("../firebase/admin");

const getAllTickets = async () => {
  try {
    const ticketsRef = db.collection("Tickets");
    const response = await ticketsRef.get();
    let responseArr = [];
    response.forEach((doc) => {
      responseArr.push(doc.data());
    });
    return {
      status: 200,
      response: responseArr,
    };
  } catch (e) {
    return {
      status: 500,
      response: e,
    };
  }
};

const getTicketSingular = async (id) => {
  try {
    const ticketsRef = db.collection("Tickets");
    const response = await ticketsRef.doc(id).get();
    return {
      status: 200,
      response: response,
    };
  } catch (e) {
    return {
      status: 500,
      response: e,
    };
  }
};

const createTicket = async (body) => {
  try {
    const ticketJson = {
      ...body.ticket,
      validUntil: admin.firestore.Timestamp.fromDate(
        new Date(body.ticket.validUntil)
      ),
    };
    const response = await db.collection("Tickets").add(ticketJson);
    if (response) {
      return {
        status: 201,
        response,
      };
    }
    return {};
  } catch (e) {
    return {
      status: 500,
      response: e,
    };
  }
};

const patchTicket = async (id, update) => {
  try {
    const response = await db.collection("Tickets").doc(id).update(update);
    return {
      status: 200,
      response,
    };
  } catch (e) {
    return {
      status: 500,
      response: e,
    };
  }
};

const deleteTicket = async (id) => {
  try {
    const response = await db.collection("Tickets").doc(id).delete();
    return {
      status: 200,
      response,
    };
  } catch (e) {
    return {
      status: 500,
      response: e,
    };
  }
};

module.exports = {
  getAllTickets,
  getTicketSingular,
  createTicket,
  patchTicket,
  deleteTicket,
};
