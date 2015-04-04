"use strict";

App.directive("dropdown", function () {

	function Link(scope, element) {
		
		element.bind("click", function () {
			var menu = element.parent().find("div.dropdown-menue");
			var menu_list_len = menu.find("li").length;
			
			if (menu_list_len) menu.removeClass("hidden");
		});
	}

	return {
		restrict : "C",
		link : Link
	};
});

//---

App.directive("dropdownMenueItem", function () {

	function Link(scope, element) {
		
		element.bind("click", function () {
			element.parent().parent().addClass("hidden");
		});
	}

	return {
		restrict: "C",
		link: Link
	};
});