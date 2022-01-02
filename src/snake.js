export default class Snake {
  constructor(x, y, size , color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.tail = [{ x: this.x, y: this.y }];
    this.rotateX = 0;
    this.rotateY = 1;
  }

  respawn() {
    this.tail = [{ x: this.x, y: this.y }];
    this.rotateX = 0;
    this.rotateY = 1;
  }

  move() {
    const headTail = this.getHeadTail();
    let newRect;

    if (this.rotateX == 1) {
      newRect = {
        x: headTail.x + this.size,
        y: headTail.y,
      };
    } else if (this.rotateX == -1) {
      newRect = {
        x: headTail.x - this.size,
        y: headTail.y,
      };
    } else if (this.rotateY == 1) {
      newRect = {
        x: headTail.x,
        y: headTail.y + this.size,
      };
    } else if (this.rotateY == -1) {
      newRect = {
        x: headTail.x,
        y: headTail.y - this.size,
      };
    }

    this.tail.shift();
    this.tail.push(newRect);
  }

  grow(el) {
    this.tail.push(el);
  }

  getHeadTail() {
    return this.tail[this.tail.length - 1];
  }

  checkHitWithApple(apple) {
    const headTail = this.getHeadTail();

    if (headTail.x == apple.x && headTail.y == apple.y) {
      return true;
    }
  }

  checkHitWithWall(canvas) {
    const headTail = this.getHeadTail();

    if (headTail.x == -this.size) {
      headTail.x = canvas.width - this.size;
    } else if (headTail.x == canvas.width) {
      headTail.x = 0;
    } else if (headTail.y == -this.size) {
      headTail.y = canvas.height - this.size;
    } else if (headTail.y == canvas.height) {
      headTail.y = 0;
    }
  }

  checkHitWithTail() {
    const headTail = this.getHeadTail();

    for (let i = 0; i < this.tail.length - 2; i++) {
      if (headTail.x === this.tail[i].x && headTail.y === this.tail[i].y) {
        return true;
      }
    }

    return false;
  }

  eatApple(apple) {
    if (this.checkHitWithApple(apple)) {
      this.grow({ x: apple.x, y: apple.y });
      apple.respawn();
    }
  }
}
