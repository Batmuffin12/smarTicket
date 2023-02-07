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

test("shouldn't let register password is invalid", async () => {
  const { status } = await request(app)
    .post("/register")
    .send({
      data: {
        ...userOne,
        password: "123",
      },
    });
  expect(status).toBe(406);
});

test("shouldn't let register creditCard is invalid", async () => {
  const { status } = await request(app)
    .post("/register")
    .send({
      data: {
        ...userOne,
        creditCard: {
          creditNum: "123",
        },
      },
    });
  expect(status).toBe(400);
});

test("shouldn't let register email is invalid", async () => {
  const { status } = await request(app)
    .post("/register")
    .send({
      data: {
        ...userOne,
        email: "123",
      },
    });
  expect(status).toBe(400);
});

test("shouldn't let register because email  already registered", async () => {
  const { status } = await request(app)
    .post("/register")
    .send({ data: userOne });
  expect(status).toBe(406);
});

test("should login for the specific user with json token", async () => {
  const { body, status } = await request(app)
    .post("/login")
    .set("Authorization", userToken)
    .send();
  userId = body.id;
  console.log(body, status);
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

test("shouldn't let login email is not correct", async () => {
  const { body, status } = await request(app)
    .post("/login")
    .send({
      data: {
        email: "123",
        password: userOne.password,
      },
    });
  expect(body.data).not.toEqual(userOne);
  expect(status).toBe(400);
});

test("shouldn't let login password is not correct", async () => {
  const { body, status } = await request(app)
    .post("/login")
    .send({
      data: {
        email: userOne.email,
        password: "123",
      },
    });
  expect(status).toBe(400);
});

test("should find an user by id", async () => {
  const { body, status } = await request(app).get(`/users/${userId}`);
  expect(body.email).toEqual(userOne.email);
  expect(status).toBe(200);
});

test("should find user by token", async () => {
  const { body, status } = await request(app).get(
    `/Users/getUser/${userToken}`
  );
  expect(body.data.email).toEqual(userOne.email);
  expect(status).toBe(200);
});

test("should get all users", async () => {
  const { body, status } = await request(app).get("/users/all");
  const check = body.find((user) => user.email === userOne.email);
  expect(body).not.toBe(null);
  expect(check).not.toBe(null);
  expect(status).toBe(200);
});

test("should patch user's name", async () => {
  await request(app)
    .patch(`/users/update`)
    .send({
      data: {
        id: userId,
        updates: {
          name: "test",
          creditCard: {
            cardValid: 1663826657201,
          },
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
