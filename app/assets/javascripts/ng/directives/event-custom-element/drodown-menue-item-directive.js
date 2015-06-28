'use strict';

App.directive('dropdownMenueItem', function () {

  function Link(scope, element) {

    element.bind('click', function () {
      element.parent().parent().addClass('hidden');
    });
  }

  return {
    restrict: 'C',
    link: Link
  };
});