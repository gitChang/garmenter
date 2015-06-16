"use strict";

App.controller("QuestionController", QuestionController);

function QuestionController($scope, DisciplinesResource, PromptService) {

	// payload.
	$scope.model = {
		discipline : null,
		class_code : null,
		question 	 : null,
		qtype 		 : null,
		choice_len : null,
		choices 	 : {},
		answers 	 : []
	};

	
	// seed data.
	$scope.collection = {
		disciplines 			: DisciplinesResource.query(),
		class_codes 			: {}, 
		letters 					: ["A", "B", "C", "D"],
		selective_letters : [], 
		numbers						: [2, 3, 4],
		bools		 					: ["True", "False"] 
	};

	
	// types of question.
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

	
	// partial template for each question type.
	$scope.choices_templates = {
		single_answer 	 : "question/partials/choices-items-mcsa.html",
		multiple_answers : "question/partials/choices-items-mcma.html",
		fill_blanks 		 : "question/partials/choices-items-fnb.html" ,
		true_false 			 : "question/partials/choices-items-tof.html"
	};

	$scope.$watch("model.qtype", function (new_qtype, old_qtype) {
		if (new_qtype !== old_qtype)
			$scope.choices_templates_path = $scope.choices_templates[new_qtype];
	});

	
	// error text to display on form alert.
	$scope.errors = {
		discipline : null,
		class_code : null,
		question 	 : null,
		qtype 		 : null,
		choice_len : null,
		choices 	 : null,
		answers 	 : null
	};

	
	// send signal to show processing prompt.
	$scope.is_processing = null; 

	
  // upon submit, indicate the process.
  // this partial must prepended to target 
  // DOM element.
	$scope.$watch('is_processing', function (val) {
		
		if (val == true) {
			PromptService.processing();
		}
		if (val == false) {
      PromptService.saved();
		}
	});


	// reset form and model.
	$scope.reset_form_model = function () {
    for (var i of Object.keys($scope.model)) {
      
      // set to null when typeof string.
      if ( angular.isString($scope.model[i]) ) {
        $scope.model[i] = null;
        continue;
      }

      // set to empty array when typeof array.
      if ( angular.isArray($scope.model[i]) ) {
        $scope.model[i] = [];

      // else empty object when typeof object.
      } else {
        $scope.model[i] = {};
      }
    }
  }

}