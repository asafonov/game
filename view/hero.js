var HeroView = function() {
  this.element = document.createElement('div');
  this.element.id = 'hero';
  this.element.style.backgroundImage = 'url(skin/hero.png)';
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_MOVED, this, 'onHeroMoved');
}

HeroView.prototype.setSize = function (width, height) {
  this.width = width;
  this.height = height;
  this.element.style.width = width + 'px';
  this.element.style.height = height + 'px';
  this.element.style.backgroundSize = width + 'px ' + height + 'px';
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
  var position = eventData.obj.position;
  var orientation = eventData.obj.orientation;
  this.element.style.marginLeft = (this.width * position.x) + 'px';
  this.element.style.marginTop = (this.height * position.y) + 'px';

  if (! asafonov.config.allowedOrientations || asafonov.config.allowedOrientations.indexOf(orientation) > -1) {
    this.applyOrientation(orientation)
  }

  if (! this.isOnScreen()) {
    var from = eventData.fromPosition;
    var to = eventData.obj.position;
    var scrollAttributes = {
      behavior: "smooth",
      block: "nearest",
      inline: "nearest"
    };

    if (this.isVerticalMove(from, to)) {
      scrollAttributes.block = this.isMovingForward(from, to) ? "start" : "end";
    }

    if (this.isHorizontalMove(from, to)) {
      scrollAttributes.inline = this.isMovingForward(from, to) ? "start" : "end";
    }

    this.element.scrollIntoView(scrollAttributes);
  }
}

HeroView.prototype.isHorizontalMove = function (fromPosition, toPosition) {
  return fromPosition.x != toPosition.x;
}

HeroView.prototype.isVerticalMove = function (fromPosition, toPosition) {
  return fromPosition.y != toPosition.y;
}

HeroView.prototype.isMovingForward = function (fromPosition, toPosition) {
  return toPosition.x > fromPosition.x || toPosition.y > fromPosition.y
}

HeroView.prototype.isOnScreen = function() {
  return this.element.offsetTop >= document.body.scrollTop && this.element.offsetTop <= document.body.scrollTop + document.documentElement.offsetHeight - this.height && this.element.offsetLeft >= document.body.scrollLeft && this.element.offsetLeft <= document.body.scrollLeft + document.documentElement.offsetWidth - this.width;
}
