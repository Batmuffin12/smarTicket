const { admin, db } = require("../firebase/admin");
const { payment } = require("../utils/paymentMethods");
const { createEntity } = require("./generic");
const { fixImg } = require("../utils/imageMethods");
const { response } = require("../server");

const buyTicket = async ({ user, train, file = undefined }) => {
  try {
    try {
      if (file) {
        var fixedFile = await fixImg(file);
      } else {
        var fixedFile = await fixImg(user.data.image);
      }
    } catch (e) {
      return {
        response: "file didnt converted well",
        status: 500,
      };
    }
    if (payment({ creditCard: user.data.creditCard })) {
      const { response, status } = await createEntity({
        data: {
          tempImg: fixedFile,
          userId: user.id,
          trainId: train.id,
          validUntil: train.data.leavingTime,
        },
        collectionName: "Tickets",
      });
      return {
        response,
        status,
      };
    }
  } catch (e) {
    return { response: e, status: 500 };
  }
};

module.exports = {
  buyTicket,
};
