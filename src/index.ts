import http from "http";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./controllers/userController";
import dotenv from "dotenv";
import isValidUuid from "./utils/isValidUuid";

dotenv.config();

export const server = http.createServer((req, res) => {
  try {
    if (req.url === "/api/users" && req.method === "GET") {
      getUsers(res);
    } else if (req.url?.split("/")[3] && req.method === "GET") {
      const id = req.url.split("/")[3];
      if (isValidUuid(id)) {
        getUser(res, id);
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "userId is not invalid" }));
      }
    } else if (req.url === "/api/users" && req.method === "POST") {
      createUser(req, res);
    } else if (req.url?.split("/")[3] && req.method === "PUT") {
      const id = req.url.split("/")[3];
      if (isValidUuid(id)) {
        updateUser(req, res, id);
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "userId is not invalid" }));
      }
    } else if (req.url?.split("/")[3] && req.method === "DELETE") {
      const id = req.url.split("/")[3];
      if (isValidUuid(id)) {
        deleteUser(res, id);
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "userId is not invalid" }));
      }
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route was not found" }));
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
});

export const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
