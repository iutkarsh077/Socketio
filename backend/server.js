import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

io.on("connection", (socket) => {
  console.log("what is socket", socket);
  console.log("Socket is active to be connected");

  socket.on("chat", (payload) => {
    console.log("Payload", payload);
    io.emit("chat", payload);
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
