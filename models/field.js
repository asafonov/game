var Field = function() {
  this.width = 64;
  this.height = 64;
  var _hero = null;
  var _positions = ['moveUp', 'moveDown', 'moveLeft', 'moveRight'];

  this.setHero = function (hero) {
    _hero = hero;
  }

  this.correctPosition = function (obj) {
    obj.position.x = Math.min(obj.position.x, this.width - 1);
    obj.position.y = Math.min(obj.position.y, this.height - 1);
    obj.position.x = Math.max(obj.position.x, 0);
    obj.position.y = Math.max(obj.position.y, 0);
  }

  for (var i = 0; i < _positions.length; ++i) {
    this[_positions[i]] = function (obj) {
      obj[_positions[i]]();
      this.correctPosition(obj);
    }
  }
}
