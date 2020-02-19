var FieldView = function() {
  this.width;
  this.height;
  this.field;
}

FieldView.prototype.init = function() {
  this.initView();
  this.addEventListeners();
  this.initModels();
}

FieldView.prototype.addEventListeners = function() {
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_ADDED, this, 'onHeroAdded');
}

FieldView.prototype.initModels = function() {
  this.field = new Field();
  this.field.setHero(new Subject());
  this.initSize();
}

FieldView.prototype.initView = function() {
  this.element = document.createElement('div');
  this.element.id = 'field';
  document.body.appendChild(this.element);
  this.heroView = new HeroView();
}

FieldView.prototype.initSize = function() {
  this.height = this.width = Math.min(document.documentElement.offsetWidth, document.documentElement.offsetHeight);
  this.element.style.width = this.width + 'px';
  this.element.style.height = this.height + 'px';
  this.heroView.setSize(this.width / this.field.width, this.height / this.field.height);
}

FieldView.prototype.onHeroAdded = function (eventData) {
  this.element.appendChild(this.heroView.element);
  this.field.moveTo(0, 0)
}

