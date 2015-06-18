"use strict";

App.controller("QuestionnaireController", QuestionnaireController);

function QuestionnaireController($scope) {

  $scope.questions = [
    {
      discipline: "English",
      question: "Who are you?",
      qtype: "Multiple Choice, Single Answer",
      date: Date.now()
    },
    {
      discipline: "Mathematics",
      question: "1 + 1 = ?",
      qtype: "Multiple Choice, Single Answer",
      date: Date.now()
    },
    {
      discipline: "Physics",
      question: "1 + 1 = ?",
      qtype: "Multiple Choice, Single Answer",
      date: Date.now()
    }
  ];
}