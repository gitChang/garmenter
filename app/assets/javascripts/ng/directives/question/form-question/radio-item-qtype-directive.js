'use strict';

App.directive("radioItemQtype", function () {

  function Link(scope, element) {

    function get_question_type_name(text) {
      var name;

      angular.forEach(scope.question_types, function (type) {
        if (type.text === text) name = type.name;
      });

      return name;
    }

    element.bind("click", function () {
      if (scope.model.qtype !== get_question_type_name( element.text().trim() )) {
        scope.model.choices = {};
        scope.model.answers = [];

        angular.forEach(scope.question_types, function (key) {
          if (element.text().trim() === key.text) scope.model.qtype = key.name;
        });

        scope.$apply();
      }
    });
  }
  
  return {
    restrict : "C",
    link : Link
  };
});