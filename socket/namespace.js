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

let users = 0;

io.on("connection", (socket) => {
  console.log("a user connected");
  users++;
  socket.emit("newUserConnect", { message: "Hey! there. Welcome here" });

  socket.broadcast.emit("newUserConnect", {
    message: `${users} Users Connected`,
  });

  //broadcasting
  // io.sockets.emit("broadcast", { message: `${users} users connected` });
  socket.on("disconnect", () => {
    console.log("user disconnected");

    users--;
    socket.broadcast.emit("newUserConnect", {
      message: `${users} Users Connected`,
    });
    //io.sockets.emit("broadcast", { message: `${users} users connected` });
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
