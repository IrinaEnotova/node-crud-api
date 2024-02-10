import { IncomingMessage, ServerResponse, get } from "http";

import * as User from "../models/userModel";
import getPostData from "../utils/getPostData";

// @desk Get All Users
// @route GET /api/users
export async function getUsers(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  try {
    const users = await User.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

// @desk Get Single User
// @route GET /api/users/:id
export async function getUser(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  id
) {
  try {
    const user = await User.findById(id);
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User was not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desk Create User
// @route POST /api/users
export async function createUser(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  try {
    // let body = "";

    // req.on("data", (chunk) => {
    //   body += chunk.toString();
    // });
    // req.on("end", async () => {
    const body = await getPostData(req);
    const { username, age, hobbies } = JSON.parse(body);

    const user = {
      username,
      age,
      hobbies,
    };
    const newUser = await User.create(user);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newUser));
    // });
  } catch (error) {
    console.log(error);
  }
}
