const { admin, db } = require("../firebase/admin");
const fixTimeStampObject = require("../utils/fixTimeStampObject");

const createEntity = async ({ data, collectionName }) => {
  try {
    const fixedData = fixTimeStampObject(data);
    const response = db.collection(collectionName).add(fixedData);
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

const getAllEntities = async ({ collectionName }) => {
  try {
    const dataRef = db.collection(collectionName);
    const response = await dataRef.get();
    let responseArr = [];
    response.forEach((doc) => {
      responseArr.push({ id: doc.id, data: doc.data() });
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

const getSingularEntity = async ({ id, collectionName }) => {
  try {
    const dataRef = db.collection(collectionName).doc(id);
    const response = await dataRef.get();
    if (response.data()) {
      return {
        status: 200,
        response: response.data(),
      };
    } else {
      return {
        status: 400,
        response: "no matched data found",
      };
    }
  } catch (e) {
    return {
      status: 500,
      response: e,
    };
  }
};

const deleteEntity = async ({ collectionName, id }) => {
  try {
    const response = await db.collection(collectionName).doc(id).delete();
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

//FIXME: to patch timestamps needed
const patchEntity = async ({ id, updates, collectionName }) => {
  try {
    const fixedUpdateObject = fixTimeStampObject(updates);
    const response = await db
      .collection(collectionName)
      .doc(id)
      .update(fixedUpdateObject);
    if (response) {
      return {
        status: 200,
        response,
      };
    } else {
      return {
        status: 400,
        response: "no user found",
      };
    }
  } catch (e) {
    return {
      status: 500,
      response: e,
    };
  }
};

module.exports = {
  createEntity,
  getAllEntities,
  getSingularEntity,
  deleteEntity,
  patchEntity,
};
