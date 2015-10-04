'use strict';

App.directive('loginBtn', function ($state, $templateCache) {

  function linker (scope, element) {
    element.on('click', function () {

      // ignore click when processing
      if (element.find('.fa-spinner').length) return;

      element.html($templateCache.get('shared-tpls/processing-tpl.html'));

      setTimeout(function () {
        $state.go('invoice-barcode-scan-page');
      }, 2000)

    })
  }

  return {
    restrict: 'C',
    link: linker
  };
})