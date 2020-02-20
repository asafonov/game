var FieldView = function() {
  this.width;
  this.height;
  this.itemWidth;
  this.itemHeight;
  this.field;
  this.onKeyDownProxy = this.onKeyDown.bind(this);
}

FieldView.prototype.init = function() {
  this.initView();
  this.addEventListeners();
  this.initModels();
}

FieldView.prototype.addEventListeners = function() {
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_ADDED, this, 'onHeroAdded');
  window.addEventListener('keydown', this.onKeyDownProxy);
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
  this.width = document.documentElement.offsetWidth;
  this.height = document.documentElement.offsetHeight;
  var minSize = Math.min(this.width, this.height);
  this.itemWidth = minSize / 10;
  this.itemHeight = minSize / 10;
  this.element.style.width = this.field.width * this.itemWidth + 'px';
  this.element.style.height = this.field.height * this.itemHeight + 'px';
  this.element.style.backgroundSize = this.itemWidth + 'px ' + this.itemHeight + 'px';
  this.heroView.setSize(this.itemWidth, this.itemHeight);
}

FieldView.prototype.onHeroAdded = function (eventData) {
  this.element.appendChild(this.heroView.element);
}

FieldView.prototype.onKeyDown = function (e) {
  if (e.keyCode == 37) {
    this.field.getHero().moveLeft();
  } else if (e.keyCode == 38) {
    this.field.getHero().moveUp();
  } else if (e.keyCode == 39) {
    this.field.getHero().moveRight();
  } else if (e.keyCode == 40) {
    this.field.getHero().moveDown();
  }
}
