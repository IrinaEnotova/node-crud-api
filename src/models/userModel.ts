import { default as data } from "../data/users.json" assert { type: "json" };

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
