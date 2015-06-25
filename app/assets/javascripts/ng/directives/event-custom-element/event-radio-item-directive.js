'use strict';

App.directive('radioItem', function () {

	function Link(scope, element, attrs) {

		var fa_class = {
			uncheck : 'fa fa-circle-thin fa-lg',
			check : 'fa fa-dot-circle-o fa-lg'
		};

		element.bind('click', function () {
			element.parents('ul.radio-list').find('i').attr('class', fa_class.uncheck);
			element.find('i').attr('class', fa_class.check);
		});
	}

	return {
		restrict : 'C',
		link : Link
	};
});