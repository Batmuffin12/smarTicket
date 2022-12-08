const request = require("supertest");
const { userOne } = require("./data/testData");
const app = require("../server");

let userToken = "";
let userId = "";

test("should register an user", async () => {
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

test("should login by the email and password", async () => {
  const { body, status } = await request(app)
    .post("/login")
    .send({
      data: {
        email: userOne.email,
        password: userOne.password,
      },
    });
  expect(body.data.email).toEqual(userOne.email);
  expect(status).toBe(200);
});

test("should find an user by id", async () => {
  const { body, status } = await request(app).get(`/users/${userId}`);
  expect(body.email).toEqual(userOne.email);
  expect(status).toBe(200);
});

test("should get all users", async () => {
  const { body, status } = await request(app).get("/users/all");
  const check = body.find((user) => user.email === userOne.email);
  expect(body).not.toBe(null);
  expect(check).not.toBe(null);
  expect(status).toBe(200);
});

//FIXME: DO NOT PATCH  RIGHT
test("should patch user's name", async () => {
  await request(app)
    .patch(`/users/update`)
    .send({
      data: {
        id: userId,
        updates: {
          name: "test",
        },
      },
    });
  const { body, status } = await request(app).get(`/users/${userId}`);
  expect(body.name).toEqual("test");
  expect(status).toBe(200);
});

test("should delete the user by userID", async () => {
  const { status } = await request(app).delete(`/users/${userId}`);
  expect(status).toBe(200);
});
