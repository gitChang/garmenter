'use strict';

App.directive( 'invoiceBarcodeNumber',
function ( $compile, $templateCache, $state, HelperSvc ) {

  function linker (scope, element) {

    var $hs = HelperSvc;
    var $invoiceNumber;


    function processInvoice () {
      // invoice barcode value
      var $invoiceNumber = element.val().trim().toUpperCase();
      // when empty value
      if ( $invoiceNumber === '' ) return;
      // check duplicate
      if ( $hs.findBarcodeDuplicate( $invoiceNumber, [] ) ) return;

      // locked this to prevent another input
      element.prop('disabled', true);

      // indicate processing
      jQuery('#spinner').removeClass('hidden');

      // set current invoice number
      $hs.setInvoiceNumber( $invoiceNumber );

      // redirect to garment scanning page with timeout.
      setTimeout( function () {
        $state.go('garment-barcode-scan-page');
      },
      2000);
    }


    // user action
    element.on('input', function () {
      // when special char not found
      //if ( !$hs.scannerSpecialCharFound( $invoiceNumber ) ) return;
      //processInvoice();
      //alert();
    })


    element.on('keyup', function (event) {
      // when not entery key
      if ( event.which !== 13 ) return;
      processInvoice();
    });


  }

  return {
    restrict: 'C',
    link: linker
  };
});