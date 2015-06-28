'use strict';

App.directive("choicesLen", function () {

  function Link(scope, element) {

    scope.$watch("model.question_choices_len", function (len) {

      scope.collection.selective_letters = [];

      for (var i = 0; i <= len - 1; i++) {
        scope.collection.selective_letters.push( scope.collection.letters[i] );
      };

      var choices_len = Object.keys(scope.model.question_choices).length;

      for (var i = choices_len - 1; i > len - 1; i--) {
        delete scope.model.question_choices[ scope.collection.letters[i] ];
      };

      scope.model.question_answers = [];

      var fa_icon = angular.element("div.choices").find("i");

      switch (scope.model.question_question_type) {
        case "single_answer" :
          fa_icon.attr("class", "fa fa-circle-thin fa-lg");
          break;
        case "multiple_answers" :
          fa_icon.attr("class", "fa fa-square-o fa-lg");
          break;
      };
    });

    scope.$watch("model.question_question_type", function (qtype) {
      switch (qtype) {
        case "single_answer" :
        case "multiple_answers" :
        case "fill_blanks" :
          element.removeClass("hidden");
          break;

        case "true_false" :
          element.addClass("hidden");
          break;

        default :
          element.addClass("hidden");
      };
    });
  }

  return {
    restrict : "C",
    link : Link
  };
});