var Field = function() {
  this.width = 100;
  this.height = 120;
  var _hero = null;
  var _positions = ['moveUp', 'moveDown', 'moveLeft', 'moveRight'];
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_MOVED, this, 'onHeroMoved');

  this.setHero = function (hero) {
    _hero = hero;
    _hero.moveTo(0, 0);
    asafonov.messageBus.send(asafonov.events.FIELD_HERO_ADDED, {field: this});
  }

  this.getHero = function() {
    return _hero;
  }

  this.getHeroPosition = function() {
    return _hero.position;
  }

  this.onHeroMoved = function (eventData) {
    this.correctPosition(eventData.obj);
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
}
