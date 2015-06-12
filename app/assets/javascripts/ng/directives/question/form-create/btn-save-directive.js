'use strict';

App.directive("btnSaveQuestion", function () {

  function Link(scope, element) {

    var validate_question_data = function () {

      if (!scope.model.discipline) 
        scope.errors.discipline = "Please provide a discipline.";
      else
        scope.errors.discipline = null;

      if (!scope.model.class_code) 
        scope.errors.class_code = "Please provide a class code.";
      else
        scope.errors.class_code = null;

      if (!scope.model.question || !scope.model.question.trim().length) 
        scope.errors.question = "Please provide a question.";
      else
        scope.errors.question = null;

      if (!Object.keys(scope.model.choices).length)
        scope.errors.choices = "Please provide all the choices below.";
      else
        scope.errors.choices = null;

      angular.forEach(scope.model.choices, function (key) {
        if (!key.trim().length) 
          scope.errors.choices = "Please provide all the choices below.";
      });

      if (!scope.model.answers.length)
        scope.errors.answers = "Please select an answer below.";
      else
        scope.errors.answers = null;

      angular.forEach(scope.model.answers, function (value) {
        if (!value.trim().length) 
          scope.errors.answers = "Please select an answer below.";
      });
    }

    scope.$watchCollection("model.answers", function (answers) {

      if (answers.length)
        element.removeClass("hidden");
      else
        element.addClass("hidden");
    });

    element.find("button").bind("click", function () {
      validate_question_data();
      console.log( "model:", JSON.stringify(scope.model) );
    });
  }

  return {
    restrict : "C",
    link: Link
  };

});