'use strict';

App.directive("dropdownClassCode", function (ClassCodesResource) {

  function Link(scope, element) {

    scope.$watch("model.question_discipline", function (discipline) {

      scope.model.question_class_code = null;

      // fill class code collection only
      // when the discipline is valid.
      console.log(scope.valid_discipline());
      if (scope.valid_discipline()) {
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