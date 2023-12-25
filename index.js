const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer();
const io = socketIO(server, { cors: { origin: "*" } });

const PORT = process.env.PORT || 3000;

let rooms = [];
let roomSize = 0;
let roomNumber = 0;
let playerCount = 0;

const game = new Game();

io.on("connection", async (socket) => {
  let playerName = "Magomed" + playerCount + 1;
  game.addPlayer(playerName, socket.id);
  playerCount++;

  console.log("user " + playerCount + "just connected");

  // user disconnects
  socket.on("disconnect", (socket) => {
    game.removePlayer(socket.id);
    console.log("A user disconnected");
  });

  // a player moves
  socket.on("player move", (keysPressed) => {
    socket.emit("player move", keysPressed);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
