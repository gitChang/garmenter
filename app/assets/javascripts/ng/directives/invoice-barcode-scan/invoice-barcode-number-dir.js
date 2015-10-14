'use strict';

App.directive( 'invoiceBarcodeNumber',
function ( $compile, $templateCache, $state, HelperSvc ) {

  function linker (scope, element) {

    var $hs = HelperSvc;


    function processInvoice () {
      // when empty value
      if ( element.attr('disabled') || !element.val() || element.val().length <= 5 ) return;

      // check duplicate
      if ( $hs.findBarcodeDuplicate( element.val(), [] ) ) {
        element.select().focus();
        return;
      }

      // locked this to prevent another input
      element.prop('disabled', true);

      // indicate processing
      jQuery('#spinner').removeClass('hidden');

      // set current invoice number
      $hs.setInvoiceNumber( element.val() );

      // redirect to garment scanning page with timeout.
      setTimeout( function () {
        $state.go('garment-barcode-scan-page');
      },
      2000);
    }


    // auto enter after scanned
    var typingTimer; // hols timeout object
    var typeInterval = 2000; // interval ajax request

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