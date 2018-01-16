
(function() {
  //constructor
  function MakeBelieveElement(DOMElements, length){
    this.elements = DOMElements;
    this.length = length;

    //functions
    this.nextSiblings = function () {
        var siblings = [];

        for(var i = 0; i < this.elements.length; i++) {
          var currentElement = this.elements[i];
          if(currentElement.nextElementSibling) {
            siblings.push(currentElement.nextElementSibling);
          }
        }

        return new MakeBelieveElement(siblings, siblings.length);
    };

    this.data = function (key, value) {
       // key = background
       // value = #ffffff
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].dataset[key] = value;
      }

      return this;
    };
  };

  var innerMakeBelieve = function (query) {
    var elements = document.querySelectorAll(query);

    if(elements) {
      return new MakeBelieveElement(elements, elements.length);
    }
    return {};
  };

  window.__ = innerMakeBelieve;
})();

var paragraphs = __('p.one').nextSiblings().data('background', '#dddddd');
console.log( __('p.one').nextSiblings());
