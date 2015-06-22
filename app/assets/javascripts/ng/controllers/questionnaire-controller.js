'use strict';

App.controller('QuestionnaireController', QuestionnaireController);

function QuestionnaireController($scope, QuestionsResource) {

  $scope.questions = QuestionsResource.query();
}