import Apple from "./apple.js";
import Snake from "./snake.js";

export default class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.canvasContext = canvas.getContext("2d");
    this.snake = new Snake(20, 20, 20);
    this.apple = new Apple(20, "red");
    this.fps = 15;
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
    this.eatApple();
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

  GameOVer() {
    this.clear();
    this.snake = new Snake(20, 20, 20);
    this.apple = new Apple(20, "red");
  }

  checkHit() {
    this.checkHitWall();
    this.checkHitWithTail();
  }

  checkHitWithTail() {
    const headTail = this.snake.getHeadTail();

    for (let i = 0; i < this.snake.tail.length - 2; i++) {
      if (headTail.x === this.snake.tail[i].x && headTail.y === this.snake.tail[i].y) {
        this.GameOVer();
        console.log(this.snake.tail);
      }
    }
  }

  checkHitWithApple() {
    const headTail = this.snake.getHeadTail();

    if (
      headTail.x == this.apple.x &&
      headTail.y == this.apple.y
    ) {
      return true;
    }
  }

  checkHitWall() {
    const headTail = this.snake.getHeadTail();

    if (headTail.x == -this.snake.size) {
      headTail.x = this.canvas.width - this.snake.size;
    } else if (headTail.x == this.canvas.width) {
      headTail.x = 0;
    } else if (headTail.y == -this.snake.size) {
      headTail.y = this.canvas.height - this.snake.size;
    } else if (headTail.y == this.canvas.height) {
      headTail.y = 0;
    }
  }

  eatApple() {
    if (this.checkHitWithApple()) {
      this.snake.increase({ x: this.apple.x, y: this.apple.y })
      this.apple = new Apple(20, "red");
    }
  }

  drawBackGround() {
    this.createRect(0, 0, this.canvas.width, this.canvas.height, "black");
  }

  drawScore() {
    this.canvasContext.font = "20px Arial";
    this.canvasContext.fillStyle = "#00FF42";
    this.canvasContext.fillText("Score: " + (this.snake.tail.length - 1), this.canvas.width - 120, 18);
    this.createRect(this.apple.x, this.apple.y, this.apple.size, this.apple.size, this.apple.color);
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
    this.drawBackGround();
    this.drawSnake();
    this.drawScore();
  }

  createRect(x, y, width, height, color) {
    this.canvasContext.fillStyle = color;
    this.canvasContext.fillRect(x, y, width, height);
  }
}
