const { admin, db } = require("../firebase/admin");
const { payment } = require("../utils/paymentMethods");
const { createEntity, getSingularEntity } = require("./generic");
const { fixImg } = require("../utils/imageMethods");

// TODO: send all of body in raw form, and not "form-data"
const buyTicket = async ({ user, tripId, file = null }) => {
  try {
    let fixedFile;
    if (file) {
      fixedFile = await fixImg(file);
    } else {
      fixedFile = await fixImg(user.data.image);
    }
    if (payment({ creditCard: user.data.creditCard })) {
      if (fixedFile) {
        const currentTrip = await getSingularEntity({
          id: tripId,
          collectionName: "Trips",
        });
        const { response, status } = await createEntity({
          data: {
            tempImg: fixedFile,
            userId: user.id,
            tripId: tripId,
            validUntil: currentTrip.response,
          },
          collectionName: "Tickets",
        });
        return {
          response,
          status,
        };
      }
      return {
        response: "no file",
        status: 400,
      };
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
