
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
    };

    //5. method .ancestor
    this.ancestor = function (selector) {
      currentElements = this.elements;
      parents = [];
      while (currentElements.length > 0) {
        for (var i = 0; i < currentElements.length; i++) {
          if (currentElements[i].parentElement) {
            if (currentElements[i].parentElement.matches(selector)) {
              return new MakeBelieveElement(currentElements[i].parentElement, 1);
            }
            if(!parents.includes(currentElements[i].parentElement)) {
              parents.push(currentElements[i].parentElement);
            }
          }

        }
        currentElements = parents;
        parents = [];
      }
      return new MakeBelieveElement(null, 0);

    };
    //6. method. onClick
    this.onClick = function () {

    };

    //7. insertText
    this.insertText = function(text) {
      for (var i = 0; i < this.length; i++) {
        this.elements[i].innerHTML = text;
      }
    };

    //7. append
    this.append = function(text) {
      for (var i = 0; i < this.length; i++) {
        this.elements[i].innerHTML = this.elements[i].innerHTML + text;
      }
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

console.log( __('p').ancestor('.zero'));
__('p.one').insertText("eyþór rokkar");
__('.zero').append("<p>Shit hvað eyþór rokkar<p>")
