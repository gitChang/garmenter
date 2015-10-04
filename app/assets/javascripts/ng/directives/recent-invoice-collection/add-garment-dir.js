'use strict';

App.directive('addGarment', function ($state, $templateCache, SharedVarsSvc) {

  function linker (scope, element) {

    function setCurrentInvoiceNumber () {
      var invoiceIdx = parseInt(element.attr('data-idx'));
      var invoiceCollectionLen =
        Object.keys(SharedVarsSvc.recentInvoiceCollection[invoiceIdx].garment_barcodes).length;
      var invoiceNumber = SharedVarsSvc.recentInvoiceCollection[invoiceIdx].invoice_number;

      SharedVarsSvc.currentInvoiceNumber = invoiceNumber;
      SharedVarsSvc.currentGarmentBarcodesLen = invoiceCollectionLen + 1; // add 1 for next entry
    }

    element.on('click', function (event) {
      event.preventDefault();

      // ignore event when processing
      if (element.find('.fa-spinner').length) return;

      // show processing
      element.html($templateCache.get('shared-tpls/processing-tpl.html'));

      setTimeout(function () {
        setCurrentInvoiceNumber();
        $state.go('garment-barcode-scan-page');
      }, 1000)
    });
  }

  return {
    restrict: 'C',
    link: linker
  };
});