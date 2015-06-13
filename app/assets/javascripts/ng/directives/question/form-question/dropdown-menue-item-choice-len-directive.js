'use strict';

App.directive("dropdownMenueItemChoiceLen", function () {

  function Link(scope, element) {
    
    element.bind("click", function () {
      scope.model.choice_len = element.text().trim();
      scope.$apply();
    });
  }

  return {
    restrict : "C",
    link : Link
  };
});