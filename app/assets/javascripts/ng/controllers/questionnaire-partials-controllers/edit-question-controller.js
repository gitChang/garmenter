'use strict';

App.controller('EditQuestionController', edit_question_controller);

function edit_question_controller ($scope, $stateParams, QuestionsResource,
  DisciplinesResource, QuestionTypesResource) {

  // seed data.
  $scope.collection = {
    disciplines       : DisciplinesResource.query(),
    question_types    : QuestionTypesResource.query(),
    class_codes       : {},
    letters           : ['A', 'B', 'C', 'D'],
    numbers           : [3, 4],
    bools             : ['True', 'False']
  };

  // payload.
  $scope.model = {
    question_discipline    : null,
    question_class_code    : null,
    question_question      : null,
    question_question_type : null,
    question_choices_len   : null,
    question_choices       : null,
    question_answers       : null
  };

  QuestionsResource.get({ id: $stateParams.question_id }).$promise.then(function (res) {

    // payload.
    $scope.model.question_discipline    = res.discipline;
    $scope.model.question_class_code    = res.class_code;
    $scope.model.question_question      = res.question;
    $scope.model.question_question_type = res.type;
    $scope.model.question_choices_len   = Object.keys(res.choices);
    $scope.model.question_choices       = res.choices;
    $scope.model.question_answers       = res.answers;

    // ...
    $scope.collection.selective_letters = Object.keys($scope.model.question_choices);

  });

  // inspects the validity of discipline selected.
  $scope.valid_discipline = function () {
    for (var i of $scope.collection.disciplines)
      if (i === $scope.model.question_discipline) return true;
    return false;
  };

  // partial template for each question type.
  $scope.choices_templates = {
    single_answer    : 'questionnaire/partials/choices-items-mcsa-w.html',
    multiple_answers : 'questionnaire/partials/choices-items-mcma-w.html',
    fill_blanks      : 'questionnaire/partials/choices-items-fnb-w.html' ,
    true_false       : 'questionnaire/partials/choices-items-tof-w.html'
  };

  // checking for models.
  //$scope.$watchCollection('model', function (m) {
  //  console.log(JSON.stringify(m));
  //});
}