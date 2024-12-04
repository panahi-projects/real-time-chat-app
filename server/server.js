const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const PORT = 3001;
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User is connected with id: ${socket.id}`);

  socket.on("client_ready", (data) => {
    console.log(data);
  });
  socket.on("new_user", (data) => {
    console.log("new user added: ", data);
  });
  socket.on("send_message", (msg) => {
    console.log("Message received:", msg);
    socket.broadcast.emit("receive_message", msg);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
