const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer();
const io = socketIO(server, { cors: { origin: "*" } });

const PORT = process.env.PORT || 3000;

let rooms = [];
let roomSize = 0;
let roomNumber = 0;

io.on("connection", async (socket) => {
  console.log("A user connected");

  // assign user to room
  if (roomSize === 20) {
    roomSize = 0;
    roomNumber++;
  }
  let roomName = 'room' + roomNumber;
  socket.join(roomName);
  roomSize++;

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  // user disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  // user moves
  socket.on("move", (position) => {
    socket.to(roomName).emit("playerMoved", { id: socket.id, position });
  });

});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
