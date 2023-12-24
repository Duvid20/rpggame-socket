const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer();

const io = require("socket.io")(server, {
  cors: {
    origin: "https://web008.wifiooe.at",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3000;

server.on("error", (error) => {
  console.log("Error starting server: " + error);
});

/* let waitingPlayers = [];
let playerRooms = {};
const MAX_PLAYERS = 3; */

/*function userJoinRoom(io, socket) {
  if (waitingPlayers.length > MAX_PLAYERS);
  const player1 = waitingPlayers.shift();
  const player2 = waitingPlayers.shift();
  const randRoomId = Math.ceil(Math.random() * 10000);
  player1.join(randRoomId);
  player2.join(randRoomId);
  playerRooms[player1.id] = randRoomId;
  playerRooms[player2.id] = randRoomId;
  io.to(randRoomId).emit("startGame", {
    room: randRoomId,
    player1: player1.id,
    player2: player2.id,
    player1Username: player1.username,
    player2Username: player2.username,
  });
  console.log(`Game started in room ${randRoomId}`);
}*/

io.on("connection", async (socket) => {
  console.log("User connected, ID: " + socket.id);
  /*socket.on("login", (username) => {
    socket.username = username;
    userJoinRoom(io, socket);
  });*/

  /*socket.on("playerMove", ({ move, fen }) => {
    const room = playerRooms[socket.id];
    socket.to(room).emit("opponentMove", { move, fen });
    console.log(move, fen, room);
  });*/

  socket.on("disconnect", () => {
    console.log("User connected, ID: " + socket.id);
    /*const room = playerRooms[socket.id];
    if (room) {
      socket
        .to(room)
        .emit(
          "opponentDisconnected",
          "Your opponent has disconnected. You win!"
        );
    }
    delete playerRooms[socket.id];
    waitingPlayers = waitingPlayers.filter((player) => player !== socket);
  });*/
  });

  server.listen(PORT, () => {
    console.log("Server started on port: " + PORT);
  });
});
