const { admin, db } = require("../firebase/admin");
const { payment } = require("../utils/paymentMethods");
const { createEntity, getSingularEntity } = require("./generic");
const { fixImg } = require("../utils/imageMethods");

// TODO: send all of body in raw form, and not "form-data"
const buyTicket = async ({ user, tripId }) => {
  try {
    if (payment({ creditCard: user.data.creditCard })) {
      if (user.data.img) {
        const { response: currentTripResponse, status: currentTripStatus } =
          await getSingularEntity({
            id: tripId,
            collectionName: "Trips",
          });
        if (currentTripStatus === 200) {
          return await createEntity({
            data: {
              userId: user.id,
              tripId: tripId,
              validUntil: currentTripResponse.data.leavingTime,
            },
            collectionName: "Tickets",
          });
        }
      }
    }
    return {
      response: "payment not ok",
      status: 400,
    };
  } catch (e) {
    console.log(e);
    return { response: e.message || e, status: 500 };
  }
};

module.exports = {
  buyTicket,
};
