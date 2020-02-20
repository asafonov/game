var HeroView = function() {
  this.element = document.createElement('div');
  this.element.id = 'hero';
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_MOVED, this, 'onHeroMoved');
}

HeroView.prototype.setSize = function (width, height) {
  this.width = width;
  this.height = height;
  this.element.style.width = width + 'px';
  this.element.style.height = height + 'px';
  this.element.style.backgroundSize = width + 'px ' + height + 'px';
}

HeroView.prototype.onHeroMoved = function (eventData) {
  var position = eventData.obj.position;
  var orientation = eventData.obj.orientation;
  this.element.style.marginLeft = (this.width * position.x) + 'px';
  this.element.style.marginTop = (this.height * position.y) + 'px';

  if (! asafonov.config.allowedOrientations || asafonov.config.allowedOrientations.indexOf(orientation) > -1) {
    this.element.style.backgroundImage = 'url(skin/hero_' + orientation + '.png)';
  }

  if (! this.isOnScreen()) {
    this.element.scrollIntoView({
      behavior: "smooth",
      block: this.isMovingForward(eventData.fromPosition, eventData.obj.position) ? "start" : "end",
      inline: this.isMovingForward(eventData.fromPosition, eventData.obj.position) ? "start" : "end"
    });
  }
}

HeroView.prototype.isMovingForward = function(fromPosition, toPosition) {
  return toPosition.x > fromPosition.x || toPosition.y > fromPosition.y
}

HeroView.prototype.isOnScreen = function() {
  return this.element.offsetTop >= document.body.scrollTop && this.element.offsetTop < document.body.scrollTop + document.documentElement.offsetHeight && this.element.offsetLeft >= document.body.scrollLeft && this.element.offsetLeft < document.body.scrollLeft + document.documentElement.offsetWidth;
}
