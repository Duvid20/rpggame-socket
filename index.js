const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

//rooms and queue for the players
let rooms = [];
let queue = [];

wss.on("connection", (ws) => {
  // Add the new player to the queue
  queue.push(ws);

  // Check if we need to create a new room
  if (
    queue.length === 10 ||
    (rooms.length > 0 && rooms[rooms.length - 1].length === 10)
  ) {
    // Create a new room with the first 10 players in the queue
    rooms.push(queue.splice(0, 10));

    // Start the game in the new room
    startGame(rooms[rooms.length - 1]);
  }
});

function startGame(room) {
  // Send a message to all players in the room to start the game
  room.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send("Start the game");
    }
  });
}

server.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on port ${server.address().port}`);
});
