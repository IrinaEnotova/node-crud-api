import http from "http";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./controllers/userController.js";

const server = http.createServer((req, res) => {
  if (req.url === "/api/users" && req.method === "GET") {
    getUsers(req, res);
    // TODO change for uuid
  } else if (req.url?.split("/")[3] && req.method === "GET") {
    const id = req.url.split("/")[3];
    getUser(req, res, id);
  } else if (req.url === "/api/users" && req.method === "POST") {
    createUser(req, res);
  } else if (req.url?.split("/")[3] && req.method === "PUT") {
    const id = req.url.split("/")[3];
    updateUser(req, res, id);
  } else if (req.url?.split("/")[3] && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    deleteUser(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "route was not found" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
