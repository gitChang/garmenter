'use strict';

App.directive('signup', function ($state, $templateCache) {

  function linker (scope, element) {
    element.on('click', function (event) {
      event.preventDefault();

      // ignore event when processing
      if (element.find('.fa-spinner').length) return;

      // show processing
      element.html($templateCache.get('shared-tpls/processing-tpl.html'));

      setTimeout(
      function () {
        $state.go('login-page');
      },
      2000)
    });
  }

  return {
    restrict: 'C',
    link: linker
  };
});