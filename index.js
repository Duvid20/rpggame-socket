const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer();
const io = socketIO(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 3000;

const { Player, PlayerManager } = require("./classes");
const { spawn } = require("child_process");
let playerManager = new PlayerManager();

function calculateNewPosition(oldPosition, keysPressed, moveSpeed) {
  let newPosition = { x: oldPosition.x, y: oldPosition.y };

  if (keysPressed.has("w") || keysPressed.has("ArrowUp")) {
    newPosition.y -= moveSpeed;
  }
  if (keysPressed.has("a") || keysPressed.has("ArrowLeft")) {
    newPosition.x -= moveSpeed;
  }
  if (keysPressed.has("s") || keysPressed.has("ArrowDown")) {
    newPosition.y += moveSpeed;
  }
  if (keysPressed.has("d") || keysPressed.has("ArrowRight")) {
    newPosition.x += moveSpeed;
  }

  return newPosition;
}

io.on("connection", async (socket) => {
  // user connects, create player
  let name = "Magomed" + socket.id.slice(0, 4);
  playerManager.addPlayer(name, "lightblue", socket.id);

  console.log("total players: " + playerManager.getPlayerCount().total);
  console.log("current players: " + playerManager.getPlayerCount().current);
  console.log(
    "player with id=" +
      playerManager
        .getPlayer(playerManager.getPlayerCount().total - 1)
        .getID() +
      " just connected"
  );

  // user disconnects, remove player
  socket.on("disconnect", (id) => {
    console.log("A user disconnected");
    playerManager.removePlayer(id);
  });

  // a player moves, calculate new position and emit it to all players
  socket.on("player move", (data) => {
    let movingPlayer = playerManager.getPlayer(data.id);
    let moveSpeed = movingPlayer.getMoveSpeed();
    let oldPosition = movingPlayer.getPosition();

    let newPosition = calculateNewPosition(
      oldPosition,
      data.keysPressed,
      moveSpeed
    );
    movingPlayer.setPosition(newPosition);

    const id = data.id;
    const position = movingPlayer.getPosition();
    const name = movingPlayer.getName();
    data.socket.emit("player position", id, position, name);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
