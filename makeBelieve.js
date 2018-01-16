
(function() {
  //constructor
  function MakeBelieveElement(DOMElements, length){
    this.elements = DOMElements;
    this.length = length;

    //functions
    //3. method .parent
    this.parent = function (selector) {
      var parents = [];

      for(var i = 0; i < this.elements.length; i++) {
        if (selector === undefined || this.elements[i].parentElement.matches(selector)) {
          if (!parents.includes(this.elements[i].parentElement)) {
            parents.push(this.elements[i].parentElement);
          }
        }
      }

      return new MakeBelieveElement(parents, parents.length);
    };

    //4. method .grandParent
    this.grandParent = function (selector) {
      var parents = [];
      var grandParents = [];

      for(var i = 0; i < this.elements.length; i++) {
        parents.push(this.elements[i].parentElement);
      }

      for (var i = 0; i < parents.length; i++) {
        if (selector === undefined || parents[i].parentElement.matches(selector)) {
          if(!grandParents.includes(parents[i].parentElement)) {
            grandParents.push(parents[i].parentElement);
          }
        }
      }

      return new MakeBelieveElement(grandParents, grandParents.length);
    }

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
console.log( __('div').parent());
