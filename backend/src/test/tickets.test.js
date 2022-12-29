const request = require("supertest");
const { userOne, trainOne } = require("./data/testData");
const app = require("../server");

let userId = "",
  trainId = "",
  userToken = "";

test("should create a train and a user", async () => {
  const { body, status } = await request(app).post("/register").send({
    data: userOne,
  });
  userToken = body.token;
  expect(status).toBe(201);
});

test("should login for the specific user with json token", async () => {
  const { body, status } = await request(app)
    .post("/login")
    .set("Authorization", userToken)
    .send();
  userId = body.id;
  expect(body.data.email).toEqual(userOne.email);
  expect(status).toBe(200);
});

// test("should create a train", async () => {
//   const { body, status } = await request(app)
//     .post("/trains/create")
//     .send({ data: trainOne });
//   expect(status).toEqual(201);
// });

test("should delete the user by userID", async () => {
  const { status } = await request(app).delete(`/users/${userId}`);
  expect(status).toBe(200);
});
