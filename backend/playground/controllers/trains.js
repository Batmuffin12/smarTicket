const { admin, db } = require("../firebase/admin");

const getAllTrains = async () => {
  try {
    const trainsRef = db.collection("Trains");
    const response = await trainsRef.get();
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

const getTrainSingular = async (id) => {
  try {
    const trainRef = db.collection("Trains").doc(id);
    const response = await trainRef.get();
    if (response.data) {
      return {
        status: 200,
        response: response.data(),
      };
    } else {
      return {
        status: 400,
        response: "no data found for id " + id,
      };
    }
  } catch (e) {
    return {
      status: 500,
      response: e,
    };
  }
};

const createTrain = async (body) => {
  try {
    const trainJson = {
      ...body.train,
      leavingTime: admin.firestore.Timestamp.fromDate(
        new Date(body.train.leavingTime)
      ),
    };

    const response = db.collection("Trains").add(trainJson);
    return {
      status: 201,
      response,
    };
  } catch (e) {
    return {
      status: 500,
      response: e,
    };
  }
};

const patchTrain = async (id, update) => {
  try {
    const response = await db.collection("Trains").doc(id).update(update);
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

const deleteTrain = async (id) => {
  try {
    const response = await db.collection("Trains").doc(id).delete();
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
  getAllTrains,
  getTrainSingular,
  createTrain,
  patchTrain,
  deleteTrain,
};
