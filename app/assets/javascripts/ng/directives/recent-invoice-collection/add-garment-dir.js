'use strict';

App.directive('addGarment',
function ( $state, $templateCache, HelperSvc ) {

  function linker ( scope, element ) {

    // inherit
    var $hs = HelperSvc;


    element.on('click', function (event) {
      event.preventDefault();

      // ignore event when processing
      if (element.find('.fa-spinner').length) return;

      // show processing
      element.html($templateCache.get('shared-tpls/processing-tpl.html'));

      // set current invoice to update
      var invoiceNumber = element.attr('data-invoice-number')
                          .trim()
                          .toUpperCase();

      // set an invoice to update
      $hs.setInvoiceNumber( invoiceNumber );
      // redirect
      setTimeout( function () { $state.go('garment-barcode-scan-page'); }, 1000);
    });
  }

  return {
    restrict: 'C',
    link: linker
  };
});