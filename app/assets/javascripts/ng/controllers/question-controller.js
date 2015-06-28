'use strict';

App.controller('QuestionController', QuestionController);

function QuestionController($scope, DisciplinesResource, QuestionTypesResource, ErrorDisplayFactory) {

	// payload.
	$scope.model = {
		question_discipline    : null,
		question_class_code    : null,
		question_question 	   : null,
		question_question_type : null,
		question_choices_len   : null,
		question_choices 	     : {},
		question_answers 	     : []
	};

	// seed data.
	$scope.collection = {
		disciplines 			: DisciplinesResource.query(),
    question_types    : QuestionTypesResource.query(),
    class_codes       : {},
		letters 					: ['A', 'B', 'C', 'D'],
		selective_letters : [],
		numbers						: [3, 4],
		bools		 					: ['True', 'False']
	};

	// partial template for each question type.
	$scope.choices_templates = {
		single_answer 	 : 'question/partials/choices-items-mcsa.html',
		multiple_answers : 'question/partials/choices-items-mcma.html',
		fill_blanks 		 : 'question/partials/choices-items-fnb.html' ,
		true_false 			 : 'question/partials/choices-items-tof.html'
	};

  // render the proper choices template base on question type.
	$scope.$watch('model.question_question_type', function (new_qtype, old_qtype) {
		if (new_qtype !== old_qtype)
			$scope.choices_templates_path = $scope.choices_templates[new_qtype];
	});

  // inspects the validity of discipline selected.
  $scope.valid_discipline = function () {
    for (var i of $scope.collection.disciplines)
      if (i === $scope.model.question_discipline) return true;
    return false;
  };

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

  // checking for models.
  $scope.$watchCollection('model', function (m) {
  	console.log(JSON.stringify(m));
  });

}