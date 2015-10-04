'use strict';

App.directive('invoiceBarcodeNumber',
  function ($compile, $templateCache, $state, SharedVarsSvc, SharedFnSvc) {

  function linker (scope, element) {
    // handle input event when using scanner device.
    element.on('input', function () {
      var charSignal = '*';
      var inputString = jQuery(this).val().replace(/(\r\n|\n|\r)/gm, charSignal);

      // ignore input when invalid. escape now.
      if (inputString.indexOf(charSignal) === -1) return;

      // indicate processing.
      jQuery('#spinner').toggleClass('hidden');

      // lock input textbox
      element.attr('disabled', true);

      // clear shared var for editing entries.
      SharedFnSvc.resetSharedVarsForEditInvoice();

      // redirect to garment scanning page with timeout.
      setTimeout(function () {
        $state.go('garment-barcode-scan-page');
      }, scope.timeOut);

    });

    // manually entered barcode number
    element.on('keyup', function (event) {
      if (event.which === 13) {
        // indicate processing
        jQuery('#spinner').toggleClass('hidden');

        // lock input textbox
        element.attr('disabled', true);

        // store invoice number to shared variable.
        SharedVarsSvc.currentInvoiceNumber = element.val().trim();

        // redirect to garment scanning page with timeout.
        setTimeout(function () {
          $state.go('garment-barcode-scan-page');
        }, scope.timeOut);
      }
    });


  }

  return {
    restrict: 'C',
    link: linker
  };
});