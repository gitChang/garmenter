'use strict';

App.directive("dropdownClassCode", function () {

  function Link(scope, element) {

    scope.$watch("model.discipline", function () {
      scope.model.class_code = null;
    });
  }
  
  return {
    restrict : "C",
    link : Link
  };
});