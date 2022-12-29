const { admin, db } = require("../firebase/admin");
const { payment } = require("../utils/paymentMethods");
const { createEntity } = require("./generic");
const { fixImg } = require("../utils/imageMethods");

const buyTicket = async ({ user, train, file = undefined }) => {
  try {
    let fixedFile;
    if (file) {
      fixedFile = await fixImg(file);
    } else {
      fixedFile = await fixImg(user.data.image);
    }
    if (fixedFile && payment({ creditCard: user.data.creditCard })) {
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
