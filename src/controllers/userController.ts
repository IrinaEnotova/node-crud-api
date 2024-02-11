import { IncomingMessage, ServerResponse } from "http";

import * as User from "../models/userModel";
import getPostData from "../utils/getPostData";

// @desk Get All Users
// @route GET /api/users
export async function getUsers(res: ServerResponse<IncomingMessage>) {
  try {
    const users = await User.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ message: "Server Error: during operation 'get users'" })
    );
  }
}

// @desk Get Single User
// @route GET /api/users/:id
export async function getUser(
  res: ServerResponse<IncomingMessage>,
  id: string
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
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Server Error: during operation 'get single user'",
      })
    );
  }
}

// @desk Create User
// @route POST /api/users
export async function createUser(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  try {
    const body = await getPostData(req);
    const { username, age, hobbies } = JSON.parse(body);
    if (!username || !age || !hobbies) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          message:
            "Body does not contain required fields. Check username, age and hobbies",
        })
      );
    } else {
      const user = {
        username,
        age,
        hobbies,
      };
      const newUser = await User.create(user);

      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(newUser));
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Server Error: during operation 'create user'",
      })
    );
  }
}

// @desk Update User
// @route PUT /api/users
export async function updateUser(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  id: string
) {
  try {
    const currentUser = await User.findById(id);

    if (!currentUser) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User was not found" }));
    } else {
      const body = await getPostData(req);
      const { username, age, hobbies } = JSON.parse(body);

      const userData = {
        username: username || currentUser.username,
        age: age || currentUser.age,
        hobbies: hobbies || currentUser.hobbies,
      };

      const updatedUser = await User.update(id, userData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updatedUser));
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Server Error: during operation 'update user'",
      })
    );
  }
}

// @desk Delete User
// @route DELETE /api/users/:id
export async function deleteUser(
  res: ServerResponse<IncomingMessage>,
  id: string
) {
  try {
    const user = await User.findById(id);
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User was not found" }));
    } else {
      await User.remove(id);
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: `User ${user.id} was successfully removed` })
      );
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Server Error: during operation 'delete user'",
      })
    );
  }
}
