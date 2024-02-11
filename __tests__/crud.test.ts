import supertest from "supertest";
import { server } from "../src/index";
import { IUserData } from "../src/interfaces";

const endpoint = "/api/users";

afterAll((done) => {
  server.close();
  done();
});

describe("CRUD server allows to", () => {
  let id: string;
  const userData: IUserData = {
    username: "Arte Perotti",
    age: 45,
    hobbies: ["swim", "sing"],
  };

  test("get all records with a GET request", async () => {
    const { body, statusCode } = await supertest(server).get(endpoint);
    expect(statusCode).toBe(200);
    expect(body).toEqual([]);
  });

  test("create new object by post", async () => {
    const { body, statusCode } = await supertest(server)
      .post(endpoint)
      .send(userData);
    id = body.id;

    expect(statusCode).toEqual(201);
    expect(body.username).toBe(userData.username);
    expect(body.age).toBe(userData.age);
    expect(JSON.stringify(body.hobbies)).toBe(JSON.stringify(userData.hobbies));
  });

  test("get the created record by its id with a GET", async () => {
    const { body, statusCode } = await supertest(server).get(
      `${endpoint}/${id}`
    );

    expect(statusCode).toBe(200);
    expect(body).toEqual({ ...userData, id });
  });

  test("update the created record with a PUT", async () => {
    const updatedData = { username: "John Doe" };
    const { body, statusCode } = await supertest(server)
      .put(`${endpoint}/${id}`)
      .send(updatedData);

    expect(statusCode).toBe(200);
    expect(body).toEqual({ ...userData, id, ...updatedData });
  });

  test("delete the created object by id with a DELETE", async () => {
    const { statusCode } = await supertest(server).delete(`${endpoint}/${id}`);

    expect(statusCode).toBe(204);
  });

  test("get a deleted object by id with a GET", async () => {
    const { body, statusCode } = await supertest(server).get(
      `${endpoint}/${id}`
    );

    expect(statusCode).toBe(404);
    expect(body).toEqual({ message: "User was not found" });
  });
});
