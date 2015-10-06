'use strict';

App.directive('garmentBarcodeNumber', function ($compile, $templateCache, SharedVarsSvc, SharedFnSvc) {

  function linker (scope, element) {

    var notifCenter = angular.element('#notif-center');
    var currInvoiceIdx = SharedVarsSvc.currentInvoiceIndex;


    function processGarment () {
      var garmentBarcode = element.val().trim().toUpperCase();

      // trapping
      if ( currInvoiceIdx !== null &&
        SharedFnSvc.findInObject(
        SharedVarsSvc.recentInvoiceCollection[
        currInvoiceIdx ]
        .garment_barcodes,
        garmentBarcode,
        notifCenter
        )) return;

      if ( SharedFnSvc.findInObject(
        scope.model.garment_barcodes,
        garmentBarcode,
        notifCenter )) return;


      // remove warning
      SharedFnSvc.removeNotification( notifCenter );


      // locked this to prevent adding new tpl
      element.prop('disabled', true);


      // assign a value to temp key
      if ( !scope.tempLastKey ) {
        // check if it is a new or
        // an update to invoice.
        if ( currInvoiceIdx !== null ) {
          // this is an update to an invoice.
          // get the last key of the garment barcodes
          // to be used as a based key for additional
          // items.
          scope.lastKey = SharedFnSvc.getLastKey(
                          SharedVarsSvc.recentInvoiceCollection[
                          currInvoiceIdx
                          ].garment_barcodes
                          );
          scope.$apply();
        }

        // pass the base key.
        scope.tempLastKey = scope.lastKey; scope.$apply();
      }

      // increment temp key to maintain ordering.
      scope.tempLastKey += 1; scope.$apply();


      // save the garment barcode
      scope.model.garment_barcodes[ scope.tempLastKey ] = garmentBarcode;
      scope.$apply();


      // allow user to delete the garment entry.
      element.parents('.row').find('.delete-scanned-garment').removeClass('hidden');


      // create new template with a temp key number label.
      scope.newGarmentScanTemplate( scope.tempLastKey );


      // scroll to page bottom and
      // give focus to newly added input text
      jQuery("html, body").animate({ scrollTop: jQuery(document).height() }, 500);
      jQuery('input:last').focus();
    }



    element.on('input', function () {

      var charSignal = '*';
      var inputString = element.val().replace(/(\r\n|\n|\r)/gm, charSignal);

      // trapping
      if ( inputString.indexOf( charSignal ) === -1 ) return;
      processGarment();
    })



    element.on('keyup', function ( event ) {
      if ( event.which !== 13 ) return;
      processGarment();
    })
  }

  return {
    restrict: 'C',
    link: linker
  }
});