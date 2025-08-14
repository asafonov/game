
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
var Subject = function() {
  this.position = new Point(0, 0)
  this.orientation = Subject.ORIENTATION_DOWN
}

Subject.ORIENTATION_LEFT = 'left'
Subject.ORIENTATION_RIGHT = 'right'
Subject.ORIENTATION_UP = 'up'
Subject.ORIENTATION_DOWN = 'down'

Subject.prototype.moveLeft = function() {
  this.orientation = Subject.ORIENTATION_LEFT
  this.move(new Point(-1 ,0))
}

Subject.prototype.moveRight = function() {
  this.orientation = Subject.ORIENTATION_RIGHT
  this.move(new Point(1, 0))
}

Subject.prototype.moveUp = function() {
  this.orientation = Subject.ORIENTATION_UP
  this.move(new Point(0, -1))
}

Subject.prototype.moveDown = function() {
  this.orientation = Subject.ORIENTATION_DOWN
  this.move(new Point(0, 1))
}

Subject.prototype.move = function (delta) {
  this.moveTo(this.position.x + delta.x, this.position.y + delta.y)
}

Subject.prototype.moveTo = function (x, y) {
  var position = new Point(this.position.x, this.position.y)
  this.position.x = x
  this.position.y = y
  asafonov.messageBus.send(asafonov.events.FIELD_HERO_MOVED, {obj: this, fromPosition: position})
}
var MessageBus = function() {
  this.subscribers = {}
}

MessageBus.prototype.send = function (type, data) {
  if (this.subscribers[type] !== null && this.subscribers[type] !== undefined) {
    for (var i = 0; i < this.subscribers[type].length; ++i) {
      this.subscribers[type][i]['object'][this.subscribers[type][i]['func']](data)
    }
  }
}

MessageBus.prototype.subscribe = function (type, object, func) {
  if (this.subscribers[type] === null || this.subscribers[type] === undefined) {
    this.subscribers[type] = []
  }

  this.subscribers[type].push({
    object: object,
    func: func
  })
}

MessageBus.prototype.destroy = function() {
  this.subscribers = null
}
var Point = function (x, y) {
  this.x = x || 0
  this.y = y || 0
}
var FieldView = function() {
  this.width
  this.height
  this.itemWidth
  this.itemHeight
  this.field
  this.onKeyDownProxy = this.onKeyDown.bind(this)
  this.onClickProxy = this.onClick.bind(this)
}

FieldView.prototype.init = function() {
  this.addEventListeners()
  this.initView()
}

FieldView.prototype.addEventListeners = function() {
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_ADDED, this, 'onHeroAdded')
  asafonov.messageBus.subscribe(asafonov.events.OBJECT_ADDED, this, 'onObjectAdded')
  window.addEventListener('keydown', this.onKeyDownProxy)
  window.addEventListener('click', this.onClickProxy)
  window.addEventListener('touchstart', this.onClickProxy)
}

FieldView.prototype.initView = function() {
  this.element = document.createElement('div')
  this.element.id = 'field'
  document.body.appendChild(this.element)
  this.heroView = new HeroView()
  this.initSize()
}

FieldView.prototype.initSize = function() {
  this.width = window.screen.width
  this.height = window.screen.height
  var minSize = Math.min(this.width, this.height)
  this.itemWidth = minSize / 8
  this.itemHeight = minSize / 8
  this.element.style.width = this.field.width * this.itemWidth + 'px'
  this.element.style.height = this.field.height * this.itemHeight + 'px'
  this.element.style.backgroundSize = this.itemWidth + 'px ' + this.itemHeight + 'px'
  this.heroView.setSize(this.itemWidth, this.itemHeight)
}

FieldView.prototype.onObjectAdded = function (eventData) {
  var element = document.createElement('div')
  element.style.marginTop = this.itemHeight * eventData.position.y + 'px'
  element.style.marginLeft = this.itemWidth * eventData.position.x + 'px'
  element.style.width = this.itemWidth + 'px'
  element.style.height = this.itemHeight + 'px'
  element.style.backgroundSize = this.itemWidth + 'px ' + this.itemHeight + 'px'
  element.className = eventData.type
  this.element.appendChild(element)
}

FieldView.prototype.onHeroAdded = function (eventData) {
  this.element.appendChild(this.heroView.element)
}

FieldView.prototype.onKeyDown = function (e) {
  if (e.keyCode == 37) {
    this.field.getHero().moveLeft()
  } else if (e.keyCode == 38) {
    this.field.getHero().moveUp()
  } else if (e.keyCode == 39) {
    this.field.getHero().moveRight()
  } else if (e.keyCode == 40) {
    this.field.getHero().moveDown()
  }
}

FieldView.prototype.onClick = function (e) {
  if (e.clientY < document.documentElement.offsetHeight / 4) {
    this.field.getHero().moveUp()
  } else if (e.clientY > document.documentElement.offsetHeight * 3 / 4) {
    this.field.getHero().moveDown()
  } else if (e.clientX < document.documentElement.offsetWidth / 4) {
    this.field.getHero().moveLeft()
  } else if (e.clientX > document.documentElement.offsetWidth * 3 / 4) {
    this.field.getHero().moveRight()
  }
}
var HeroView = function() {
  this.element = document.createElement('div')
  this.element.id = 'hero'
  this.element.style.backgroundImage = 'url(skin/hero.png)'
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_MOVED, this, 'onHeroMoved')
}

HeroView.prototype.setSize = function (width, height) {
  this.width = width
  this.height = height
  this.element.style.width = width + 'px'
  this.element.style.height = height + 'px'
  this.element.style.backgroundSize = width + 'px ' + height + 'px'
}

HeroView.prototype.applyOrientation = function (orientation) {
  if (orientation === 'left') {
    this.element.style.transform = 'rotate(90deg)'
  } else if (orientation === 'right') {
    this.element.style.transform = 'rotate(270deg)'
  } else if (orientation === 'up') {
    this.element.style.transform = 'rotate(0deg)'
  } else {
    this.element.style.transform = 'rotate(0deg)'
  }
}

HeroView.prototype.onHeroMoved = function (eventData) {
  var position = eventData.obj.position
  var orientation = eventData.obj.orientation
  this.element.style.marginLeft = (this.width * position.x) + 'px'
  this.element.style.marginTop = (this.height * position.y) + 'px'

  if (! asafonov.config.allowedOrientations || asafonov.config.allowedOrientations.indexOf(orientation) > -1) {
    this.applyOrientation(orientation)
  }

  if (! this.isOnScreen()) {
    var from = eventData.fromPosition
    var to = eventData.obj.position
    var scrollAttributes = {
      behavior: "smooth",
      block: "nearest",
      inline: "nearest"
    }

    if (this.isVerticalMove(from, to)) {
      scrollAttributes.block = this.isMovingForward(from, to) ? "start" : "end"
    }

    if (this.isHorizontalMove(from, to)) {
      scrollAttributes.inline = this.isMovingForward(from, to) ? "start" : "end"
    }

    this.element.scrollIntoView(scrollAttributes)
  }
}

HeroView.prototype.isHorizontalMove = function (fromPosition, toPosition) {
  return fromPosition.x != toPosition.x
}

HeroView.prototype.isVerticalMove = function (fromPosition, toPosition) {
  return fromPosition.y != toPosition.y
}

HeroView.prototype.isMovingForward = function (fromPosition, toPosition) {
  return toPosition.x > fromPosition.x || toPosition.y > fromPosition.y
}

HeroView.prototype.isOnScreen = function() {
  const elementTop = this.element.offsetTop
  const elementLeft = this.element.offsetLeft
  const scrollTop = document.body.scrollTop
  const scrollLeft = document.body.scrollLeft
  const windowHeight = window.screen.height
  const windowWidth = window.screen.width

  return elementTop >= scrollTop && elementTop <= scrollTop + windowHeight - this.height && elementLeft >= scrollLeft && elementLeft <= scrollLeft + windowWidth - this.width
}
window.asafonov = {}
window.asafonov.messageBus = new MessageBus()
window.asafonov.events = {
  FIELD_HERO_ADDED: 'fieldHeroAdded',
  FIELD_HERO_MOVED: 'fieldHeroMoved',
  OBJECT_ADDED: 'objectAdded'
}
window.asafonov.config = {
  allowedOrientations: [Subject.ORIENTATION_LEFT, Subject.ORIENTATION_RIGHT, Subject.ORIENTATION_UP, Subject.ORIENTATION_DOWN]
}
document.addEventListener("DOMContentLoaded", function(event) { 
  var view = new FieldView()
  view.field = new Field()
  view.init()
  view.field.setHero(new Subject())
  var objectMap = [null]

  for (var i = 0; i < 100 * 120; ++i) {
    var type = null
    var random = Math.random()

    if (random < 0.125) {
      type = 'stone'
    } else if (random < 0.25) {
      type = 'lake'
    }

    objectMap.push(type)
  }

  view.field.setObjectMap(objectMap)
})
