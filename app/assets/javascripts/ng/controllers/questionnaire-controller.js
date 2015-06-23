'use strict';

App.controller('QuestionnaireController', QuestionnaireController);

function QuestionnaireController($scope, QuestionsResource) {

  // load all question to the table.
  $scope.questions = QuestionsResource.query();
}