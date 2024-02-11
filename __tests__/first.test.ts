import supertest from "supertest";
import { server } from "../src/index";
// import { IUserData } from "../src/interfaces";

// jest.mock("../src/data/users.json", () => {
//   return [];
// });

const endpoint = "/api/users";

// const firstUser: IUserData = {
//   username: "Arte Perotti",
//   age: 45,
//   hobbies: ["swim"],
// };

// const secondUser: IUserData = {
//   username: "Marcellina Henken",
//   age: 75,
//   hobbies: ["dance"],
// };

afterAll((done) => {
  server.close();
  done();
});

describe("First case", () => {
  test("get all records with a GET request", async () => {
    const { body, statusCode } = await supertest(server).get(endpoint);
    expect(statusCode).toEqual(200);
    expect(body).toEqual([]);
  });
});
