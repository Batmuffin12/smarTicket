const { db } = require("../firebase/admin");
const fixTimeStampObject = require("../utils/fixTimeStampObject");

const createEntity = async ({ data, collectionName }) => {
  try {
    const fixedData = fixTimeStampObject(data);
    const response = await db.collection(collectionName).add(fixedData);
    return getSingularEntity({
      id: response._path.segments[1],
      collectionName,
    });
  } catch (e) {
    return {
      status: 500,
      response: e.message || e,
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
      response: e.message || e,
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
        response: {
          id,
          data: response.data(),
        },
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
      response: e.message || e,
    };
  }
};

const deleteEntity = async ({ collectionName, id }) => {
  try {
    console.log(id, collectionName);
    const response = await db.collection(collectionName).doc(id).delete();
    return {
      status: 200,
      response: id,
    };
  } catch (e) {
    return {
      status: 500,
      response: e.message || e,
    };
  }
};

const deleteManyEntities = async ({ collectionName, entities }) => {
  try {
    const batch = db.batch();
    entities.forEach((entity) =>
      batch.delete(db.collection(collectionName).doc(entity))
    );
    const response = await batch.commit();
    return {
      status: 200,
      response: entities,
    };
  } catch (e) {
    return {
      status: 500,
      response: e.message || e,
    };
  }
};

const patchEntity = async ({ id, updates, collectionName }) => {
  try {
    const fixedUpdateObject = fixTimeStampObject(updates);
    const response = await db
      .collection(collectionName)
      .doc(id)
      .update(fixedUpdateObject);
    if (response) {
      return getSingularEntity({ id, collectionName });
    } else {
      return {
        status: 400,
        response: "no user found",
      };
    }
  } catch (e) {
    return {
      status: 500,
      response: e.message || e,
    };
  }
};

module.exports = {
  createEntity,
  getAllEntities,
  getSingularEntity,
  deleteEntity,
  patchEntity,
  deleteManyEntities,
};
