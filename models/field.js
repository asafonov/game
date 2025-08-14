var Field = function() {
  this.width = 100
  this.height = 120
  var _objects = []
  var _hero = null
  var _positions = ['moveUp', 'moveDown', 'moveLeft', 'moveRight']
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_MOVED, this, 'onHeroMoved')

  this.setHero = function (hero) {
    _hero = hero
    _hero.moveTo(0, 0)
    asafonov.messageBus.send(asafonov.events.FIELD_HERO_ADDED, {field: this})
  }

  this.getHero = function() {
    return _hero
  }

  this.getHeroPosition = function() {
    return _hero.position
  }

  this.onHeroMoved = function (eventData) {
    this.correctPosition(eventData.obj, eventData.fromPosition)
  }

  this.positionToIndex = function (position) {
    return position.y * this.width + position.x
  }

  this.indexToPosition = function (index) {
    return new Point(index % this.width, parseInt(index / this.width, 10))
  }

  this.setObjectMap = function (objects) {
    for (var i = 0; i < objects.length; ++i) {
      if (objects[i] !== null && objects[i] !== undefined) {
        this.addObject(objects[i], this.indexToPosition(i))
      }
    }
  }

  this.addObject = function (type, position) {
    _objects[this.positionToIndex(position)] = type
    asafonov.messageBus.send(asafonov.events.OBJECT_ADDED, {type: type, position: position})
  }

  this.correctPosition = function (obj, fromPosition) {
    var i = this.positionToIndex(obj.position)

    if (obj.position.x < 0 || obj.position.y < 0 || obj.position.x > this.width - 1 || obj.position.y > this.height - 1 || (_objects[i] !== null && _objects[i] !== undefined)) {
      obj.moveTo(fromPosition.x, fromPosition.y)
    }
  }
}
