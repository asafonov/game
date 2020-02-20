var Subject = function() {
  this.position = new Point(0, 0);
  this.orientation = Subject.ORIENTATION_LEFT;
}

Subject.ORIENTATION_LEFT = 'left';
Subject.ORIENTATION_RIGHT = 'right';
Subject.ORIENTATION_UP = 'up';
Subject.ORIENTATION_DOWN = 'down';

Subject.prototype.moveLeft = function() {
  this.orientation = Subject.ORIENTATION_LEFT;
  this.move(new Point(-1 ,0));
}

Subject.prototype.moveRight = function() {
  this.orientation = Subject.ORIENTATION_RIGHT;
  this.move(new Point(1, 0));
}

Subject.prototype.moveUp = function() {
  this.orientation = Subject.ORIENTATION_UP;
  this.move(new Point(0, -1));
}

Subject.prototype.moveDown = function() {
  this.orientation = Subject.ORIENTATION_DOWN;
  this.move(new Point(0, 1));
}

Subject.prototype.move = function (delta) {
  this.moveTo(this.position.x + delta.x, this.position.y + delta.y);
}

Subject.prototype.moveTo = function (x, y) {
  this.position.x = x;
  this.position.y = y;
  asafonov.messageBus.send(asafonov.events.FIELD_HERO_MOVED, {obj: this});
}
