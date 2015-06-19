"use strict";

App.factory("DisciplinesResource", function ($resource) {
  return $resource("/api/disciplines/:id", { id: "@id" });
});


App.factory("QuestionsResource", function ($resource) {
  return $resource("/api/questions/:id", { id: "@id" });
});


App.factory("ClassCodesResource", function ($resource) {
  return $resource("/api/class_codes/:id", { id: "@id" });
});


App.factory("QuestionTypesResource", function ($resource) {
  return $resource("/api/question_types/:id", { id: "@id" });
});