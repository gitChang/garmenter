'use strict';

App.directive('invoiceBarcodeNumber',
  function ($compile, $templateCache, $state, SharedVarsSvc, SharedFnSvc) {

  function linker (scope, element) {

    var notifCenter = angular.element('#notif-center');


    function processInvoice () {
      if ( SharedFnSvc.findInObjectArray( SharedVarsSvc.recentInvoiceCollection, element.val().trim(), notifCenter )) return;

      // locked this to prevent another input
      element.prop('disabled', true);

      // remove warning
      SharedFnSvc.removeNotification(notifCenter);

      // indicate processing
      jQuery('#spinner').toggleClass('hidden');

      // lock input textbox
      element.attr('disabled', true);

      // store invoice number to shared variable.
      SharedVarsSvc.currentInvoiceNumber = element.val().trim().toUpperCase();

      // redirect to garment scanning page with timeout.
      setTimeout(function () {
        $state.go('garment-barcode-scan-page');
      }, scope.timeOut);
    }


    element.on('input', function () {
      var charSignal = '*';
      var inputString = element.val().replace(/(\r\n|\n|\r)/gm, charSignal);

      // trapping
      if ( inputString.indexOf( charSignal ) === -1 ) return;
      processInvoice();
    })


    element.on('keyup', function (event) {
      // trapping
      if ( event.which !== 13 ) return;
      processInvoice();
    });


  }

  return {
    restrict: 'C',
    link: linker
  };
});