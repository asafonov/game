var Subject = function() {
  this.position = new Point(0, 0);
}

Subject.prototype.moveLeft = function() {
  this.move(new Point(-1 ,0));
}

Subject.prototype.moveRight = function() {
  this.move(new Point(1, 0));
}

Subject.prototype.moveUp = function() {
  this.move(new Point(0, 1));
}

Subject.prototype.moveDown = function() {
  this.move(new Point(0, -1));
}

Subject.prototype.move = function (delta) {
  this.position.x += delta.x;
  this.position.y += delta.y;
}

Subject.prototype.moveTo = function (x, y) {
  this.position.x = x;
  this.position.y = y;
}

Subject.prototype.destroy = function() {
  this.position = null;
}
