'use strict';

App.directive('done', function ($state, $templateCache, SharedSvc) {

  function linker (scope, element) {

    function makeHistory () {
      var cacheCollection = SharedSvc.recentInvoiceCollection;
      // put to history
      SharedSvc.historyInvoiceCollection = cacheCollection;

      // clear the array of recent collection.
      // since the value is on the history already.
      SharedSvc.recentInvoiceCollection = [];
    }

    element.on('click', function (event) {
      event.preventDefault();

      // ignore event when processing
      if (element.find('.fa-spinner').length) return;

      // show processing
      element.html($templateCache.get('shared-tpls/processing-tpl.html'));

      makeHistory();

      setTimeout(function () {
        $state.go('invoice-barcode-scan-page');
      }, 2000)
    });
  }

  return {
    restrict: 'C',
    link: linker
  };
});