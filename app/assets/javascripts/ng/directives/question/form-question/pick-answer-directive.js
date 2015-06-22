'use strict';

App.directive("pickAnswer", function () {

  function Link(scope, element) {

    function get_answer_index(letter) {
      var ret = null;

      for (var i = scope.model.question_answers.length - 1; i >= 0; i--) {
        if (scope.model.question_answers[i] === letter) ret = i;
      };

      return ret;
    }

    element.bind("click", function () {

      var li_index = element.parents("li").index();
      var letter = scope.collection.letters[li_index];

      switch (scope.model.question_question_type) {
        case "single_answer" :
          scope.model.question_answers[0] = letter;
          break;

        case "multiple_answers" :
          var idx = get_answer_index(letter);
          if (idx !== null)
            scope.model.question_answers.splice(idx, 1);
          else
            scope.model.question_answers.push(letter);
          break;

        case "true_false" :
          if (scope.model.question_answers[0] !== scope.collection.bools[li_index])
            scope.model.question_answers[0] = scope.collection.bools[li_index];
          break;
      };
      scope.$apply();
    });
  }

  return {
    restrict : "C",
    link : Link
  };
});