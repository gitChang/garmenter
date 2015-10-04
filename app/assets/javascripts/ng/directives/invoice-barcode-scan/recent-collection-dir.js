'use strict';

App.directive('recentCollection', function ($compile, $templateCache, $state) {

  function linker (scope, element) {
    element.on('click', function (event) {
      event.preventDefault();

      // do not proceed when no scanned garments.
      if (!scope.recentInvoiceScannedNumber) return;

      $state.go('recent-invoice-collection-page');
    })
  }

  return {
    restrict: 'C',
    link: linker
  };
})