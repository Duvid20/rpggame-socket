/*class Game {
  startMoveSpeed = 5;
  spawnPosition = { top: 300, left: 300 };
  players = [];

  constructor() {
    this.inputHandler = new InputHandler(this.player);
    this.inputHandler.executeEventListener();
  }

  addPlayer(name, socketId) {
    this.players.push(
      new Player(name, socketId, this.spawnPosition, this.startMoveSpeed)
    );
  }

  removePlayer(socketId) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id === socketId) {
        this.players.splice(i, 1);
      }
    }
  }
}

class Player {
  constructor(name, id, color, position, moveSpeed) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.position = position;
    this.moveSpeed = moveSpeed;
  }
}*/

/*class InputHandler {
  constructor(player) {
    this.player = player;
  }

  executeEventListener() {
    const playerDiv = document.getElementById("player");
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "w" || event === 38:
          this.player.position.top -= this.player.moveSpeed;
          playerDiv.style.top = this.player.position.top + "px";
          console.log("up");
          break;
        case "a" || event === 37:
          playerDiv.style.left = parseInt(player.style.left) - moveSpeed + "px";
          console.log("left");
          break;
        case "s" || event === 40:
          playerDiv.style.top = parseInt(player.style.top) + moveSpeed + "px";
          console.log("down");
          break;
        case "d" || event === 39:
          playerDiv.style.left = parseInt(player.style.left) + moveSpeed + "px";
          console.log("right");
          break;
      }
    });
  }
}*/
