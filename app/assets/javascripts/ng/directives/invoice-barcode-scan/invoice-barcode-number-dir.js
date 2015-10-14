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
      if ( !$invoiceNumber || $invoiceNumber.length <= 5 ) return;
      // check duplicate
      if ( $hs.findBarcodeDuplicate( $invoiceNumber, [] ) ) {
        element.select().focus();
        return;
      }

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


    // auto enter after scanned
    var typingTimer; // hols timeout object
    var typeInterval = 2500; // interval ajax request

    function doneTypingCallBack() {
      var e = $.Event('keyup');
      e.which = 13;
      element.trigger(e)
    }


    //--
    // events
    //--

    element.on('input', function() {
      // clears the timeout object to avoid stuck request.
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTypingCallBack, typeInterval);
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