'use strict';

App.directive('addGarment', function ($state, $templateCache, SharedFnSvc) {

  function linker (scope, element) {

    element.on('click', function (event) {
      event.preventDefault();

      // ignore event when processing
      if (element.find('.fa-spinner').length) return;

      // show processing
      element.html($templateCache.get('shared-tpls/processing-tpl.html'));

      // set a target invoice to add garments
      var invoiceIndex = parseInt(element.attr('data-idx').trim());
      SharedFnSvc.setTargetInvoice(invoiceIndex);

      setTimeout( function () { $state.go('garment-barcode-scan-page'); }, 1000);
    });
  }

  return {
    restrict: 'C',
    link: linker
  };
});