const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer();
const io = socketIO(server, { cors: { origin: "*" } });

const PORT = process.env.PORT || 3000;

let rooms = [];
let roomSize = 0;
let roomNumber = 0;
let playerCount = 0;

io.on("connection", async (socket) => {
  let username = "Magomed" + playerCount + 1;
  socket.emit("username", username);
  socket.emit("socketID", socket.id);
  socket.emit("playerID", playerCount);
  playerCount++;
  console.log("player with id=" + playerCount + " just connected");

  // user disconnects
  socket.on("disconnect", (socket) => {
    console.log("A user disconnected");
  });

  // a player moves
  socket.on("player move", (data) => {
    let oldPosition = calculateNewPosition(
      data.player.position,
      data.keysPressed
    );

    data.socket.emit("player move", data);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
