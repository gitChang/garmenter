'use strict';

App.directive("dropdownClassCode", function (ClassCodesResource) {

  function Link(scope, element) {

    scope.$watch("model.question_discipline", function (discipline) {

      scope.model.question_class_code = null;

      var valid = (function () {
        for (var i of scope.collection.disciplines)
          if (i === discipline) return true;
        return false;
      })();

      if (valid) {
        ClassCodesResource.query({ question_discipline: discipline })
        .$promise.then(function (res) {
          scope.collection.class_codes[scope.model.question_discipline] = res;
        });
      }

    });
  }

  return {
    restrict : "C",
    link : Link
  };
});