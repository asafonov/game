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
  if (orientation === Subject.ORIENTATION_LEFT) {
    this.element.style.transform = 'scaleX(-1)'
  } else if (orientation === Subject.ORIENTATION_RIGHT) {
    this.element.style.transform = 'scaleX(1)'
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
