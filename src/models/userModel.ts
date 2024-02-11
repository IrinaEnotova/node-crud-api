import { v4 } from "uuid";
import { IUser } from "../interfaces";

let data: IUser[] = [];

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
    resolve(data[index]);
  });
}

export function remove(id: string) {
  return new Promise<void>((resolve) => {
    const filteredData = data.filter((userItem) => userItem.id !== id);
    data = filteredData;
    resolve();
  });
}
