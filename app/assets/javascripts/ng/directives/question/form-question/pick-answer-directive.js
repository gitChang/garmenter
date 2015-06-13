'use strict';

App.directive("pickAnswer", function () {

  function Link(scope, element) {

    function get_answer_index(letter) {
      var ret = null;

      for (var i = scope.model.answers.length - 1; i >= 0; i--) {
        if (scope.model.answers[i] === letter) ret = i;
      };

      return ret;
    }

    element.bind("click", function () {

      var li_index = element.parents("li").index();
      var letter = scope.collection.letters[li_index];

      switch (scope.model.qtype) {
        case "single_answer" :
          scope.model.answers[0] = letter;
          break;

        case "multiple_answers" :
          var idx = get_answer_index(letter);
          if (idx !== null) 
            scope.model.answers.splice(idx, 1);
          else 
            scope.model.answers.push(letter);
          break;

        case "true_false" :
          if (scope.model.answers[0] !== scope.collection.bools[li_index])
            scope.model.answers[0] = scope.collection.bools[li_index];
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