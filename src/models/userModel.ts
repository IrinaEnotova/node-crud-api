import { default as data } from "../data/users.json" assert { type: "json" };
import { v4 } from "uuid";
import writeDataToFile from "../utils/writeDataToFile";
import { IUser } from "../interfaces";

export function findAll() {
  return new Promise((resolve) => {
    resolve(data);
  });
}

export function findById(id: string): Promise<IUser | undefined> {
  return new Promise((resolve) => {
    const user = data.find((dataItem) => dataItem.id === id);
    resolve(user);
  });
}

export function create(user: {
  username: string;
  age: number;
  hobbies: string[];
}) {
  return new Promise((resolve) => {
    const newUser = { id: v4(), ...user };
    data.push(newUser);
    writeDataToFile("./src/data/users.json", data);
    resolve(newUser);
  });
}

export function update(
  id: string,
  user: {
    username: string;
    age: number;
    hobbies: string[];
  }
) {
  return new Promise((resolve) => {
    const index = data.findIndex((userItem) => userItem.id === id);
    data[index] = { id, ...user };
    writeDataToFile("./src/data/users.json", data);
    resolve(data[index]);
  });
}

export function remove(id: string) {
  return new Promise<void>((resolve) => {
    const filteredData = data.filter((userItem) => userItem.id !== id);
    writeDataToFile("./src/data/users.json", filteredData);
    resolve();
  });
}
