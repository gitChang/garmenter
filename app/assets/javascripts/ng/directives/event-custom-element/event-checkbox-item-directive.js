"use strict";

App.directive("checkboxItem", function () {

	function Link(scope, element) {

		var fa_class = {
			uncheck : "fa fa-square-o fa-lg",
			check : "fa fa-check-square fa-lg"
		};
		
		element.bind("click", function () {
			var fa_icon = element.find("i");
			
			var inactive = fa_icon.attr("class") === fa_class.uncheck;
			var active = fa_icon.attr("class") === fa_class.check;

			if (inactive) 
				fa_icon.attr("class", fa_class.check);
			else
				fa_icon.attr("class", fa_class.uncheck);
		});
	}

	return {
		restrict : "C",
		link : Link
	};
});