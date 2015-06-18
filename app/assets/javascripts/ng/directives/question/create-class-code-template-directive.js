"use strict";

App.directive("createClassCodeTemplate", function () {

	function Link(scope) {

		scope.$watch("model.discipline", function (discipline) {
			if (discipline)
				angular.element("button.save-class-code").removeClass("hidden")
			else
				angular.element("button.save-class-code").addClass("hidden")
		});
	}

	return {
		restrict : "E",
		link : Link,
		templateUrl : "question/partials/create-class-code.html"
	};
});