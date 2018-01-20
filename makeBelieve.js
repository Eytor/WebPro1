
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
    this.onClick = function (func) {
      if (typeof(func) === 'function') {
        for (var i = 0; i < this.length; i++) {
          this.elements[i].addEventListener("click", func);
        }
      }
    };

    //7. insertText
    this.insertText = function(text) {
      for (var i = 0; i < this.length; i++) {
        this.elements[i].innerHTML = text;
      }
    };

    //8. append
    this.append = function(text) {
      for (var i = 0; i < this.length; i++) {
        var currentText = this.elements[i].innerHTML;
        if(typeof text === 'string') {
          this.elements[i].innerHTML = currentText + text;
        }
        else {
            this.elements[i].innerHTML = currentText + text.textContent;
        }
      }
    };

    //9. prepend
    this.prepend = function(text) {
      for (var i = 0; i < this.length; i++) {
        var currentText = this.elements[i].innerHTML;
        if(typeof text === 'string') {
          this.elements[i].innerHTML = text + currentText;
        }
        else {
            this.elements[i].innerHTML = text.textContent + currentText;
        }
      }
    };

    //10. delete
    this.delete = function() {
      for (var i = 0; i < this.length; i++) {
        this.elements[i].remove();
      }
      return this;
    };

    //11. ajax
    //skildi þetta ekki

    //12. css
    this.css = function(styles, setting) {
      var style = styles + ":"+ setting;
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].setAttribute("style", style);
      }
      return this;
    };

    //13. toggleClass
    this.toggleClass = function (c) {
      for (var i = 0; i < this.elements.length; i++) {
        if (this.elements[i].classList.contains(c)) {
          this.elements[i].classList.remove(c);
        }
        else {
          this.elements[i].classList.add(c);
        }
      }
    };

    //14. onSubmit
    this.onSubmit = function (func) {
      if (typeof(func) === 'function') {
        for (var i = 0; i < this.length; i++) {
          this.elements[i].addEventListener("submit", func);
        }
      }
    };

    //15. onInput
    this.onInput = function (func) {
      if (typeof(func) === 'function') {
        for (var i = 0; i < this.length; i++) {
          this.elements[i].addEventListener("input", func);
        }
      }
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

console.log( __('p').elements);
__('p.one').insertText("eyþór rokkar");
__('.zero').append("<p>Shit hvað eyþór rokkar<p>")
__('.zero').append(
  document.createElement('p')
    .appendChild(
      document.createTextNode('eyþór elskar sokka')
    )
  );
__('p').css('color', 'red')
console.log(typeof(function (){}) === 'function')
__('#password').onInput(function (evt) {
  console.log(evt.target.value);
});
