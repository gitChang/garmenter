'use strict';

App.directive('done', function ($state, $templateCache, SharedVarsSvc) {

  function linker (scope, element) {

    function makeHistory () {
      var cacheCollection = SharedVarsSvc.recentInvoiceCollection;
      // put to history
      SharedVarsSvc.historyInvoiceCollection = cacheCollection;

      // clear the array of recent collection.
      // since the value is on the history already.
      SharedVarsSvc.recentInvoiceCollection = [];
    }

    element.on('click', function (event) {
      event.preventDefault();

      // ignore event when processing
      if (element.find('.fa-spin').length) return;

      // show processing
      element.find('.fa-refresh').addClass('fa-spin');

      makeHistory();

      setTimeout(function () {
        $state.go('invoice-barcode-scan-page');
      }, 3000)
    });
  }

  return {
    restrict: 'C',
    link: linker
  };
});