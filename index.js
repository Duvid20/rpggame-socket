const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer();
const io = socketIO(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 3000;

const { Player, PlayerManager } = require("./classes");
const { spawn } = require("child_process");
let playerManager = new PlayerManager();

function calculateNewPosition(oldPosition, keysPressed, moveSpeed) {
  let newPosition = { top: oldPosition.top, left: oldPosition.left };
  //let keysPressed = new Set(keysPressedArr);
  console.log("typeof keysPressed: " + typeof keysPressed);
  console.log("keysPressed: " + keysPressed);

  if (keysPressed.includes("w") || keysPressed.includes("ArrowUp")) {
    newPosition.left -= moveSpeed;
  }
  if (keysPressed.includes("a") || keysPressed.includes("ArrowLeft")) {
    newPosition.top -= moveSpeed;
  }
  if (keysPressed.includes("s") || keysPressed.includes("ArrowDown")) {
    newPosition.left += moveSpeed;
  }
  if (keysPressed.includes("d") || keysPressed.includes("ArrowRight")) {
    newPosition.top += moveSpeed;
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

  // emmit id to new player socket
  io.emit("id", playerManager.getPlayerCount().total - 1);

  // user disconnects, remove player socket
  socket.on("disconnect", (id) => {
    console.log("A user disconnected");
    playerManager.removePlayer(id);
  });

  // a player moves, calculate new position and emit it to all players
  socket.on("player move", (data) => {
    let movingPlayer = playerManager.getPlayer(data.id);
    console.log("moving player: " + movingPlayer.getName());
    let moveSpeed = movingPlayer.getMoveSpeed();
    let oldPosition = movingPlayer.getPosition();

    let newPosition = calculateNewPosition(
      oldPosition,
      data.keysPressedArr,
      moveSpeed
    );
    movingPlayer.setPosition(newPosition);

    const id = data.id;
    const position = movingPlayer.getPosition();
    const name = movingPlayer.getName();
    io.emit("player position", { id, position, name });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
