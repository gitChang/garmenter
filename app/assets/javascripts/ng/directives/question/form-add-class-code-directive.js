"use strict";

App.directive("formAddClassCode", function () {

	function Link(scope) {

		scope.$watch("model.discipline", function (discipline) {
			if (discipline)
				$("ul#button-list").removeClass("hidden")
			else
				$("ul#button-list").addClass("hidden")
		});
	}

	return {
		restrict : "E",
		link : Link,
		templateUrl : "question/partials/form-add-class-code.html"
	};
});


App.directive("addClassCodeButton", function () {

	function Link(scope, element) {

		element.bind("click", function () {
			var selector = $("input[name='new_class_code']");
			var	val = selector.val().trim();
			var	arr_val = [val];

			if (scope.collection.class_codes[scope.model.discipline]) 
				scope.collection.class_codes[scope.model.discipline].push(val);
			else
				scope.collection.class_codes[scope.model.discipline] = arr_val;

			scope.$apply();

			selector.focus().val("");
		});
	}

	return {
		restrict : "C",
		link : Link
	};
});