var FieldView = function() {
  this.width;
  this.height;
}

FieldView.prototype.init = function() {
  this.initView();
  this.addEventListeners();
  this.initModels();
}

FieldView.prototype.addEventListeners = function() {
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_ADDED, this, 'onHeroAdded');
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_MOVED, this, 'onHeroMoved');
}

FieldView.prototype.initModels = function() {
  this.field = new Field();
  this.field.setHero(new Subject());
}

FieldView.prototype.initView = function() {
  this.element = document.createElement('div');
  this.element.id = 'field';
  document.body.appendChild(this.element);
  this.initSize();
}

FieldView.prototype.initSize = function() {
  this.height = this.width = Math.min(document.documentElement.offsetWidth, document.documentElement.offsetHeight);
  this.element.style.width = this.width + 'px';
  this.element.style.height = this.height + 'px';
  console.log(this.width + 'px');
  console.log(this.height + 'px');
}

FieldView.prototype.onHeroAdded = function (eventData) {
  console.log("onHeroAdded");
}

FieldView.prototype.onHeroMoved = function (eventData) {
  console.log("onHeroMoved");
}
