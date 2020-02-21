var FieldView = function() {
  this.width;
  this.height;
  this.itemWidth;
  this.itemHeight;
  this.field;
  this.onKeyDownProxy = this.onKeyDown.bind(this);
  this.onClickProxy = this.onClick.bind(this);
}

FieldView.prototype.init = function() {
  this.addEventListeners();
  this.initView();
}

FieldView.prototype.addEventListeners = function() {
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_ADDED, this, 'onHeroAdded');
  asafonov.messageBus.subscribe(asafonov.events.OBJECT_ADDED, this, 'onObjectAdded');
  window.addEventListener('keydown', this.onKeyDownProxy);
  window.addEventListener('click', this.onClickProxy);
  window.addEventListener('touchstart', this.onClickProxy);
}

FieldView.prototype.initView = function() {
  this.element = document.createElement('div');
  this.element.id = 'field';
  document.body.appendChild(this.element);
  this.heroView = new HeroView();
  this.initSize();
}

FieldView.prototype.initSize = function() {
  this.width = document.documentElement.offsetWidth;
  this.height = document.documentElement.offsetHeight;
  var minSize = Math.min(this.width, this.height);
  this.itemWidth = minSize / 8;
  this.itemHeight = minSize / 8;
  this.element.style.width = this.field.width * this.itemWidth + 'px';
  this.element.style.height = this.field.height * this.itemHeight + 'px';
  this.element.style.backgroundSize = this.itemWidth + 'px ' + this.itemHeight + 'px';
  this.heroView.setSize(this.itemWidth, this.itemHeight);
}

FieldView.prototype.onObjectAdded = function (eventData) {
  var element = document.createElement('div');
  element.style.marginTop = this.itemHeight * eventData.position.y + 'px';
  element.style.marginLeft = this.itemWidth * eventData.position.x + 'px';
  element.style.width = this.itemWidth + 'px';
  element.style.height = this.itemHeight + 'px';
  element.style.backgroundSize = this.itemWidth + 'px ' + this.itemHeight + 'px';
  element.className = eventData.type;
  this.element.appendChild(element);
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

FieldView.prototype.onClick = function (e) {
  if (e.clientY < document.documentElement.offsetHeight / 4) {
    this.field.getHero().moveUp();
  } else if (e.clientY > document.documentElement.offsetHeight * 3 / 4) {
    this.field.getHero().moveDown();
  } else if (e.clientX < document.documentElement.offsetWidth / 4) {
    this.field.getHero().moveLeft();
  } else if (e.clientX > document.documentElement.offsetWidth * 3 / 4) {
    this.field.getHero().moveRight();
  }
}
