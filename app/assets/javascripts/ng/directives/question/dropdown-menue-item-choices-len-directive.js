'use strict';

App.directive("dropdownMenueItemChoicesLen", function () {

  function Link(scope, element) {

    element.bind("click", function () {
      scope.model.question_choices_len = element.text().trim();
      scope.$apply();
    });
  }

  return {
    restrict : "C",
    link : Link
  };
});