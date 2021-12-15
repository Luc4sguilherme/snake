export default class Apple {
  constructor(size, color) {
    this.size = size;
    this.color = color;
    this.x = Math.floor((Math.random() * canvas.width) / this.size) * this.size;
    this.y = Math.floor((Math.random() * canvas.height) / this.size) * this.size;
  }
}
