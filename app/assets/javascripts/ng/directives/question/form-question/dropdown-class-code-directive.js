'use strict';

App.directive("dropdownClassCode", function (ClassCodesResource) {

  function Link(scope, element) {

    scope.$watch("model.discipline", function (discipline) {
      
      scope.model.class_code = null;

      if (discipline) {
        ClassCodesResource.query({ discipline: discipline })
        .$promise.then(function (res) {
          scope.collection.class_codes[scope.model.discipline] = res;
        });
      }

    });
  }
  
  return {
    restrict : "C",
    link : Link
  };
});