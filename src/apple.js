export default class Apple {
  constructor(size, color) {
    this.size = size;
    this.color = color;
    this.position = this.spawn()
  }

  spawn() {
    return {
      x: Math.floor((Math.random() * canvas.width) / this.size) * this.size,
      y: Math.floor((Math.random() * canvas.height) / this.size) * this.size,
    };
  }

  respawn() {
    this.position = this.spawn()
  }
}
