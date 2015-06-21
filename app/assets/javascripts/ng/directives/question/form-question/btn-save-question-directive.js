'use strict';

App.directive('btnSaveQuestion', function ($rootScope, $templateCache, PromptService, QuestionsResource) {

  function Link(scope, element) {

    scope.$watchCollection('model.answers', function (answers) {
      if (answers.length) {
        element.removeClass('hidden');
      } else {
        element.addClass('hidden');
      }
    });


    var validate_question_data = function () {

      if (!scope.model.discipline) {
        scope.errors.discipline = 'Please provide a discipline.';
      } else {
        scope.errors.discipline = null;
      }

      if (!scope.model.class_code) {
        scope.errors.class_code = 'Please provide a class code.';
      } else {
        scope.errors.class_code = null;
      }

      if (!scope.model.question || !scope.model.question.trim().length) {
        scope.errors.question = 'Please provide a question.';
      } else {
        scope.errors.question = null;
      }

      if (scope.model.qtype !== 'true_false') {
        if (!Object.keys(scope.model.choices).length) {
          scope.errors.choices = 'Please provide all the choices below.';
        } else {
          scope.errors.choices = null;
        }

        angular.forEach(scope.model.choices, function (key) {
          if (!key.trim().length) {
            scope.errors.choices = 'Please provide all the choices below.';
          }
        });
      }

      if (!scope.model.answers.length) {
        scope.errors.answers = 'Please select an answer below.';
      } else {
        scope.errors.answers = null;
      }

      angular.forEach(scope.model.answers, function (value) {
        if (!value.trim().length) {
          scope.errors.answers = 'Please select an answer below.';
        }
      });

      var no_error = true;

      angular.forEach(scope.errors, function (key) {
        if (key) no_error = false;
      });

      return no_error;
    }


    element.find('button').bind('click', function () {

      if (validate_question_data()) {

        PromptService.processing();

        // param in choices, answers resources.
        var question_id = null;

        // create new question.
        QuestionsResource.save(scope.model).$promise
        .then(function (res) {
          question_id = res.question_id;
        },
        function (error) {
          // stop function from here.
          console.log(error);
          return;
        });

        // create choices for the question.
        ChoicesResource.save({ question_id: question_id }).$promise
        .then(function () {
          //todo
        },
        function (err) {
          // delete question instead.
          QuestionsResource.delete({ id: question_id });
        });

        // create answers for the question.
        AnswersResource.save({ question_id: question_id }).$promise
        .then(function (res) {
          // reset form and model scope.
          scope.reset_form_model();
          // prompt saved to user.
          PromptService.saved();
        },
        function (err) {
          // delete question and choices instead.
          QuestionsResource.delete({ id: question_id });
          AnswersResource.delete({ question_id: question_id });
        });

      }

    });
  }

  return {
    restrict : 'C',
    link: Link
  };

});