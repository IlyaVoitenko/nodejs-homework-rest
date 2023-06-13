const app = require("../../../app");
const mongoose = require("mongoose");
const supertest = require("supertest");
const { Users } = require("../../../models/users");
const { HOST_DB_TEST, PORT } = process.env;

describe("test register route", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(HOST_DB_TEST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  beforeEach(async () => {});

  afterEach(async () => {
    await Users.deleteMany({});
  });

  test("test register with data", async () => {
    const registerData = {
      email: "lilia@vestibul.uk",
      password: "12345",
    };
    const { statusCode } = await supertest(app)
      .post("/api/user/register")
      .send(registerData);
    expect(statusCode).toBe(201);

    const user = await Users.findOne({ email: registerData.email });
    expect(user.email).toBe(registerData.email);
  });
});
