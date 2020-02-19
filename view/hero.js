var HeroView = function() {
  this.element = document.createElement('div');
  this.element.id = 'hero';
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_MOVED, this, 'onHeroMoved');
}

HeroView.prototype.setSize = function (width, height) {
  this.element.style.width = width + 'px';
  this.element.style.height = height + 'px';
}

HeroView.prototype.onHeroMoved = function (eventData) {
  console.log("onHeroMoved");
}
