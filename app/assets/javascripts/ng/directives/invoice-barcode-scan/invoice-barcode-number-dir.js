'use strict';

App.directive('invoiceBarcodeNumber',
  function ($compile, $templateCache, $state, SharedVarsSvc, SharedFnSvc) {

  function linker (scope, element) {

    //element.on('input', function () {
    //  var charSignal = '*';
    //  var inputString = jQuery(this).val().replace(/(\r\n|\n|\r)/gm, charSignal);
    //})

    var notifCenter = angular.element('#notif-center');

    element.on('keyup', function (event) {

      // trapping
      if ( event.which !== 13 ) return;
      if ( SharedFnSvc.findInObjectArray( SharedVarsSvc.recentInvoiceCollection, element.val().trim(), notifCenter )) return;

      // remove warning
      SharedFnSvc.removeNotification(notifCenter);

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
    });


  }

  return {
    restrict: 'C',
    link: linker
  };
});