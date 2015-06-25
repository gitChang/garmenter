'use strict';

App.controller('PreviewQuestionController', preview_question_controller);

function preview_question_controller ($scope, $stateParams, QuestionsResource) {

  QuestionsResource.get({ id: $stateParams.question_id }).$promise.then(function (res) {

    // model.
    $scope.question = {
      question : res.question,
      type     : res.type,
      choices  : res.choices,
      answers  : res.answers,
      letters  : Object.keys(res.choices)
    };

  });


  // partial template for each question type.
  $scope.choices_templates = {
    single_answer    : 'questionnaire/partials/choices-items-mcsa-ro.html',
    multiple_answers : 'questionnaire/partials/choices-items-mcma-ro.html',
    fill_blanks      : 'questionnaire/partials/choices-items-fnb-ro.html' ,
    true_false       : 'questionnaire/partials/choices-items-tof-ro.html'
  };
}