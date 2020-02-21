document.addEventListener("DOMContentLoaded", function(event) { 
  var view = new FieldView();
  view.field = new Field();
  view.init();
  view.field.setHero(new Subject());
  var objectMap = [null];

  for (var i = 0; i < 100 * 120; ++i) {
    objectMap.push(Math.random() < 0.25 ? 'stone' : null);
  }

  view.field.setObjectMap(objectMap);
});
