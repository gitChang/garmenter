'use strict';

App.directive('addGarmentDir', function ($state, $templateCache, HelperSvc) {

  function linker (scope, element) {

    //
    // aliases
    //
    var $helper = HelperSvc;

    //
    // event handlers
    //
    function clickEventHandler(event) {
      event.preventDefault();

      // ignore event when processing
      if (element.find('.fa-spinner').length) return;
      // show processing
      element.html($templateCache.get('shared-tpls/processing-tpl.html'));

      // set current invoice to update
      var _invoiceBarcode = element.attr('data-invoice-number')
                            .trim()
                            .toUpperCase();
      // set an invoice to update
      $helper.setInvoiceBarcode(_invoiceBarcode);
      // redirect
      setTimeout(function () { $state.go('garment-barcode-scan-page'); }, 1000);
    }

    //
    // events
    //
    element.on('click', clickEventHandler);

  }

  return {
    restrict: 'C',
    link: linker
  };
});