import { default as data } from "../data/users.json" assert { type: "json" };
import { v4 } from "uuid";
import writeDataToFile from "../utils/writeDataToFile";

export function findAll() {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
}

export function findById(id) {
  return new Promise((resolve, reject) => {
    const user = data.find((dataItem) => dataItem.id === id);
    resolve(user);
  });
}

export function create(user: {
  username: string;
  age: number;
  hobbies: string[];
}) {
  return new Promise((resolve, reject) => {
    const newUser = { id: v4(), ...user };
    data.push(newUser);
    writeDataToFile("./src/data/users.json", data);
    resolve(newUser);
  });
}

export function update(
  id,
  user: {
    username: string;
    age: number;
    hobbies: string[];
  }
) {
  return new Promise((resolve, reject) => {
    const index = data.findIndex((userItem) => userItem.id === id);
    data[index] = { id, ...user };
    writeDataToFile("./src/data/users.json", data);
    resolve(data[index]);
  });
}
