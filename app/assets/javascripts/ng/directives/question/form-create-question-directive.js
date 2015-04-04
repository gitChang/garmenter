"use strict";

App.directive("formCreateQuestion", function () {
	return {
		restrict : "E",
		templateUrl : "question/partials/form-create-question.html"
	};
});

//---

App.directive("dropdownMenueItemDiscipline", function () {

	function Link(scope, element) {

		element.bind("click", function () {
			scope.model.discipline = element.text().trim();
			scope.$apply();
		});
	}
	
	return {
		restrict : "C",
		link : Link
	};
});

//---

App.directive("dropdownClassCode", function () {

	function Link(scope, element) {

		scope.$watch("model.discipline", function () {
			scope.model.class_code = null;
		});
	}
	
	return {
		restrict : "C",
		link : Link
	};
});

//---

App.directive("dropdownMenueItemClassCode", function () {

	function Link(scope, element) {

		element.bind("click", function () {
			scope.model.class_code = element.text().trim();
			scope.$apply();
		});
	}
	
	return {
		restrict : "C",
		link : Link
	};
});

//---

App.directive("radioItemQtype", function () {

	function Link(scope, element) {

		function get_question_type_name(text) {
			var name;

			angular.forEach(scope.question_types, function (type) {
				if (type.text === text) name = type.name;
			});

			return name;
		}

		element.bind("click", function () {
			if (scope.model.qtype !== get_question_type_name( element.text().trim() )) {
				scope.model.choices = {};
				scope.model.answers = [];

				angular.forEach(scope.question_types, function (key) {
					if (element.text().trim() === key.text) scope.model.qtype = key.name;
				});

				scope.$apply();
			}
		});
	}
	
	return {
		restrict : "C",
		link : Link
	};
});

//---

App.directive("formGroupChoiceLen", function () {

	function Link(scope, element) {

		scope.$watch("model.choice_len", function (len) {

			scope.collection.selective_letters = [];

			for (var i = 0; i <= len - 1; i++) {
				scope.collection.selective_letters.push( scope.collection.letters[i] );
			};

			var choices_len = Object.keys(scope.model.choices).length;

			for (var i = choices_len - 1; i > len - 1; i--) {
				delete scope.model.choices[ scope.collection.letters[i] ];
			};

			scope.model.answers = [];

			var fa_icon = angular.element("div.form-group-choices").find("i");

			switch (scope.model.qtype) {
				case "single_answer" :
					fa_icon.attr("class", "fa fa-circle-thin fa-lg");
					break;
				case "multiple_answers" :
					fa_icon.attr("class", "fa fa-square-o fa-lg");
					break;
			};
		});

		scope.$watch("model.qtype", function (qtype) {
			switch (qtype) {
				case "single_answer" :
				case "multiple_answers" :
				case "fill_blanks" :
					element.removeClass("hidden");
					break;

				case "true_false" :
					element.addClass("hidden");
					break;

				default :
					element.addClass("hidden");
			};
		});
	}

	return {
		restrict : "C",
		link : Link
	};
});

//---

App.directive("dropdownMenueItemChoiceLen", function () {

	function Link(scope, element) {
		
		element.bind("click", function () {
			scope.model.choice_len = element.text().trim();
			scope.$apply();
		});
	}

	return {
		restrict : "C",
		link : Link
	};
});

//---

App.directive("formGroupChoices", function () {

	function Link(scope, element) {

		scope.$watch("model.qtype", function (qtype) {
			if (qtype)
					element.removeClass("hidden");
			else
					element.addClass("hidden");
		});
	}

	return {
		restrict : "C",
		link : Link
	};
});

//---

App.directive("pickAnswer", function () {

	function Link(scope, element) {

		function get_answer_index(letter) {
			var ret = null;

			for (var i = scope.model.answers.length - 1; i >= 0; i--) {
				if (scope.model.answers[i] === letter) ret = i;
			};

			return ret;
		}

		element.bind("click", function () {

			var li_index = element.parents("li").index();
			var letter = scope.collection.letters[li_index];

			switch (scope.model.qtype) {
				case "single_answer" :
					scope.model.answers[0] = letter;
					break;

				case "multiple_answers" :
					var idx = get_answer_index(letter);
					if (idx !== null) 
						scope.model.answers.splice(idx, 1);
					else 
						scope.model.answers.push(letter);
					break;

				case "true_false" :
					if (scope.model.answers[0] !== scope.collection.bools[li_index])
						scope.model.answers[0] = scope.collection.bools[li_index];
					break;
			};
			scope.$apply();
		});
	}

	return {
		restrict : "C",
		link : Link
	};
});

//---

App.directive("btnSaveQuestion", function () {

	function Link(scope, element) {

		scope.$watchCollection("model.answers", function (answers) {

			if (answers.length)
				element.removeClass("hidden");
			else
				element.addClass("hidden");
		});

		element.find("button").click(function () {
			console.log( "model:", JSON.stringify(scope.model) );
		});
	}

	return {
		restrict : "C",
		link: Link
	};
});