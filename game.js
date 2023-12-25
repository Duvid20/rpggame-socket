class Game {
  constructor(name, color) {
    this.player = new Player(name, "player", color, { top: 50, left: 50 }, 5);
    this.inputHandler = new InputHandler(this.player);
    this.inputHandler.executeEventListener();
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
}

class InputHandler {
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
}

const game = new Game("Magomed");
