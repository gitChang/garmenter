'use strict';

App.directive("dropdownMenueItemClassCode", function () {

  function Link(scope, element) {

    element.bind("click", function () {
      scope.model.class_code = element.text().trim();
      scope.$apply();
    });
  }
  
  return {
    restrict : "C",
    link : Link
  };
});