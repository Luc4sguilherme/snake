import Apple from "./apple.js";
import Snake from "./snake.js";

export default class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.canvasContext = canvas.getContext("2d");
    this.snake = new Snake(20, 20, 20, 'white');
    this.apple = new Apple(20, "red");
    this.fps = 10;
  }

  initialize() {
    window.onload = () => {
      this.gameLoop();
      this.configureKeyEvent();
    };
  }

  gameLoop() {
    setInterval(this.show.bind(this), 1000 / this.fps);
  }

  clear() {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  update() {
    this.clear();
    this.snake.move();
    this.snake.eatApple(this.apple);
    this.checkHit();
  }

  show() {
    this.update();
    this.draw();
  }

  configureKeyEvent() {
    window.addEventListener("keydown", (event) => {
      setTimeout(() => {
        if (event.keyCode == 37 && this.snake.rotateX != 1) {
          this.snake.rotateX = -1;
          this.snake.rotateY = 0;
        } else if (event.keyCode == 38 && this.snake.rotateY != 1) {
          this.snake.rotateX = 0;
          this.snake.rotateY = -1;
        } else if (event.keyCode == 39 && this.snake.rotateX != -1) {
          this.snake.rotateX = 1;
          this.snake.rotateY = 0;
        } else if (event.keyCode == 40 && this.snake.rotateY != -1) {
          this.snake.rotateX = 0;
          this.snake.rotateY = 1;
        }
      }, 1);
    });
  }

  gameOver() {
    this.clear();
    this.snake.respawn();
    this.apple.respawn();
  }

  checkHit() {
    this.snake.checkHitWithWall(this.canvas);
    if (this.snake.checkHitWithTail()) {
      this.gameOver();
    }
  }

  drawBackground() {
    this.createRect(0, 0, this.canvas.width, this.canvas.height, "black");
  }

  drawScore() {
    this.canvasContext.font = "20px Arial";
    this.canvasContext.fillStyle = "#00FF42";
    this.canvasContext.fillText("Score: " + (this.snake.tail.length - 1), this.canvas.width - 120, 18);
  }

  drawApple() {
    this.createRect(this.apple.x + 2.5, this.apple.y + 2.5, this.apple.size - 5, this.apple.size - 5, this.apple.color);
  }

  drawSnake() {
    for (let i = 0; i < this.snake.tail.length; i++) {
      this.createRect(
        this.snake.tail[i].x + 2.5,
        this.snake.tail[i].y + 2.5,
        this.snake.size - 5,
        this.snake.size - 5,
        this.snake.color
      );
    }
  }

  draw() {
    this.drawBackground();
    this.drawSnake();
    this.drawScore();
    this.drawApple();
  }

  createRect(x, y, width, height, color) {
    this.canvasContext.fillStyle = color;
    this.canvasContext.fillRect(x, y, width, height);
  }
}
