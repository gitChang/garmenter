"use strict";

App.controller("QuestionController", QuestionController);

function QuestionController($scope) {

	$scope.model = {
		discipline : null,
		class_code : null,
		question : null,
		qtype : null,
		choice_len : null,
		choices : {},
		answers : []
	};

	//---

	$scope.collection = {
		disciplines 			: ["English", "Mathematics", "Physics"],
		class_codes 			: {}, 
		letters 					: ["A", "B", "C", "D"],
		selective_letters : [], 
		numbers						: [2, 3, 4],
		bools		 					: ["True", "False"] 
	};

	//---

	$scope.question_types = [
		{
			name : "single_answer",
			text : "Multiple Choice, Single Answer"
		},
		{
			name : "multiple_answers",
			text : "Multiple Choice, Multiple Answers"
		},
		{
			name : "fill_blanks",
			text : "Fill in the Blanks"
		},
		{
			name : "true_false",
			text : "True or False"
		}
	];

	//---

	$scope.choices_templates = {
		single_answer : "question/partials/choices-items-mcsa.html",
		multiple_answers : "question/partials/choices-items-mcma.html",
		fill_blanks : "question/partials/choices-items-fnb.html",
		true_false : "question/partials/choices-items-tof.html"
	};

	$scope.$watch("model.qtype", function (new_qtype, old_qtype) {
		if (new_qtype !== old_qtype)
			$scope.choices_templates_path = $scope.choices_templates[new_qtype];
	});

	//---

	$scope.validation_question_data = function () {
		...
	};

}