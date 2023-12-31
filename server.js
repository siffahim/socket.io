const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

let roomNo = 1;
let full = 0;

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.join("room-" + roomNo);

  io.sockets
    .in("room-" + roomNo)
    .emit("connectedRoom", `You are connected to room no. ${roomNo}`);

  full++;
  if (full >= 2) {
    full = 0;
    roomNo++;
  }

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
