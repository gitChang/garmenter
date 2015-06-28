'use strict';

App.directive('dropdownMenueItemDiscipline', function () {

  function Link(scope, element) {

    element.bind('click', function () {
      scope.model.question_discipline = element.text().trim();
      scope.$apply();
    });
  }

  return {
    restrict : 'C',
    link : Link
  };
});