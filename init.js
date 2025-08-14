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
