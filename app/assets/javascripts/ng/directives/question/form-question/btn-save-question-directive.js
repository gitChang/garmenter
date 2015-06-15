'use strict';

App.directive("btnSaveQuestion", function ($http, $templateCache) {

  function Link(scope, element) {

    scope.$watchCollection("model.answers", function (answers) {
      if (answers.length) {
        element.removeClass("hidden");
      } else {
        element.addClass("hidden");
      }
    });

    /**
    * inspect the validity of the values entered.
    * which bound to scope.model object.
    **/
    var validate_question_data = function () {

      if (!scope.model.discipline) {
        scope.errors.discipline = "Please provide a discipline.";
      } else {
        scope.errors.discipline = null;
      }

      if (!scope.model.class_code) { 
        scope.errors.class_code = "Please provide a class code.";
      } else {
        scope.errors.class_code = null;
      }

      if (!scope.model.question || !scope.model.question.trim().length) {
        scope.errors.question = "Please provide a question.";
      } else {
        scope.errors.question = null;
      }

      if (scope.model.qtype !== 'true_false') {
        if (!Object.keys(scope.model.choices).length) {
          scope.errors.choices = "Please provide all the choices below.";
        } else {
          scope.errors.choices = null;
        }

        angular.forEach(scope.model.choices, function (key) {
          if (!key.trim().length) {
            scope.errors.choices = "Please provide all the choices below.";
          }
        });
      }

      if (!scope.model.answers.length) {
        scope.errors.answers = "Please select an answer below.";
      } else {
        scope.errors.answers = null;
      }

      angular.forEach(scope.model.answers, function (value) {
        if (!value.trim().length) {
          scope.errors.answers = "Please select an answer below.";
        }
      });

      var no_error = true;

      angular.forEach(scope.errors, function (key) {
        if (key) no_error = false;
      });

      return no_error;
    }

    /**
    * trigger save question button on the form.
    **/
    element.find("button").bind("click", function () {

      if (validate_question_data()) {
        /**
        * send flag saving mode.
        **/
        scope.is_processing = true;

        /**
        * send the payload
        **/
        $http.post(Routes.questions_path(), scope.model)
        .success(function (res) {
          console.log("res:", JSON.stringify(res));
          scope.is_processing = false;
        })
        .error(function () {
          //todo.
        });
      }
    });
  }

  return {
    restrict : "C",
    link: Link
  };

});