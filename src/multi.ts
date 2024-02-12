import os from "os";
import cluster from "cluster";
import http, {
  IncomingMessage,
  ServerResponse,
  request,
  createServer,
} from "http";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./controllers/userController.js";
import isValidUuid from "./utils/isValidUuid.js";

const server = http.createServer((req, res) => {
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

const PORT = process.env.PORT || 4000;

const cores = os.cpus().length;
let separatePort = +PORT + 1;

if (cluster.isPrimary) {
  console.log(`Load balancer ${process.pid} is running on port ${PORT}`);

  createServer((req: IncomingMessage, res: ServerResponse) => {
    const options = {
      hostname: "localhost",
      port: separatePort,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const proxy = request(options, function (incomingMessage: IncomingMessage) {
      res.writeHead(incomingMessage.statusCode!, incomingMessage.headers);
      incomingMessage.pipe(res, { end: true });

      if (separatePort === +PORT + cores) {
        separatePort = +PORT + 1;
      } else {
        separatePort = separatePort + 1;
      }
    });

    req.pipe(proxy, { end: true });
  }).listen(PORT);

  for (let i = 0; i < cores; i++) {
    cluster.fork({
      PORT: +PORT + 1 + i,
    });
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} has exited`);
  });
} else {
  server.listen(PORT);
  console.log(`Worker ${process.pid} starts work on port ${PORT}`);
}
