var Field = function() {
  this.width = 64;
  this.height = 64;
  var _hero = null;
  var _positions = ['moveUp', 'moveDown', 'moveLeft', 'moveRight'];

  this.setHero = function (hero) {
    _hero = hero;
    asafonov.messageBus.send(asafonov.events.FIELD_HERO_ADDED, {field: this});
  }

  this.getHero = function() {
    return _hero;
  }

  this.getHeroPosition = function() {
    return _hero.position;
  }

  this.correctPosition = function (obj) {
    var x = Math.min(obj.position.x, this.width - 1);
    var y = Math.min(obj.position.y, this.height - 1);
    x = Math.max(x, 0);
    y = Math.max(y, 0);

    if (x != obj.position.x || y != obj.position.y) {
      obj.moveTo(x, y);
    }
  }

  this.moveTo = function (x, y, obj) {
    obj = obj || _hero;
    obj.moveTo(x, y);
  }

  for (var i = 0; i < _positions.length; ++i) {
    this[_positions[i]] = function (obj) {
      obj = obj || _hero;
      obj[_positions[i]]();
      this.correctPosition(obj);
    }
  }
}
