import os from "os";
import cluster, { Worker } from "cluster";
import http, { IncomingMessage, ServerResponse, createServer } from "http";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./controllers/userController.js";
import isValidUuid from "./utils/isValidUuid.js";

const handleRequest = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  try {
    if (
      (req.url === "/api/users" || req.url === "/api/users/") &&
      req.method === "GET"
    ) {
      getUsers(res);
    } else if (req.url?.split("/")[3] && req.method === "GET") {
      const id = req.url.split("/")[3];
      if (isValidUuid(id)) {
        getUser(res, id);
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "userId is not invalid" }));
      }
    } else if (
      (req.url === "/api/users" || req.url === "/api/users/") &&
      req.method === "POST"
    ) {
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
};

const PORT = process.env.PORT || 4000;

const cores = os.cpus().length;

const workers: Worker[] = [];
if (cluster.isPrimary) {
  const server = createServer(handleRequest);
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  console.log(`Primary process ${process.pid} is running`);

  for (let i = 0; i < cores; i++) {
    const worker = cluster.fork();
    workers.push(worker);
    console.log(`Worker ${worker.process.pid} started`);
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
    workers.splice(workers.indexOf(worker), 1);
  });
} else {
  const server = http.createServer(handleRequest);
  server.listen(+PORT + cluster.worker!.id, () =>
    console.log(
      `Worker ${cluster.worker?.id} running on port ${+PORT + cluster.worker!.id}`
    )
  );
}
