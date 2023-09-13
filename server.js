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

io.on("connection", (socket) => {
  console.log("a user connected");
  //   setTimeout(() => {
  //     socket.send("Sent Message from server side");
  //   }, 3000);

  socket.emit("customEvent", { description: "Message form server side" });
  socket.on("customEventFromClient", (data) => {
    console.log(data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

// const express = require("express");
// const app = express();
// const port = 5000;
// const path = require("path");
// const http = require("http").Server(app);

// const io = require("socket.io")(http);

// app.get("/", (req, res) => {
//   const options = {
//     root: path.join(__dirname),
//   };
//   res.sendFile("index.html", options);
// });

// //socket connect
// io.on("connection", function (socket) {
//   console.log("User connected");
//   socket.on("disconnect", function () {
//     console.log("User Disconnected");
//   });
// });

// app.listen(port, () => {
//   console.log("App listening on port", port);
// });
