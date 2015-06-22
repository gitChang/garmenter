'use strict';

App.directive("choices", function () {

  function Link(scope, element) {

    scope.$watch("model.question_question_type", function (qtype) {
      if (qtype)
          element.removeClass("hidden");
      else
          element.addClass("hidden");
    });
  }

  return {
    restrict : "C",
    link : Link
  };
});