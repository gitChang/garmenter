'use strict';

App.directive('garmentBarcodeNumber', function ($compile, $templateCache, SharedVarsSvc, SharedFnSvc) {

  function linker (scope, element) {

    var notifCenter = angular.element('#notif-center');


    function processGarment () {
      var garmentBarcode = element.val().trim();

      // locked this to prevent adding new tpl
      element.prop('disabled', true);

      // trapping
      if ( SharedVarsSvc.currentInvoiceIndex !== null &&
        SharedFnSvc.findInObject(
        SharedVarsSvc.recentInvoiceCollection[
        SharedVarsSvc
        .currentInvoiceIndex ]
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


      // generate last key for the next key of the garment object
      var lastKey = SharedFnSvc.getLastKey( scope.model.garment_barcodes );


      // add new garment barcode to model
      scope.model.garment_barcodes[ lastKey + 1 ] = garmentBarcode;


      // allow user to delete the garment entry.
      element.parents('.row').find('.delete-scanned-garment').removeClass('hidden');


      // create new template
      scope.newGarmentScanTemplate();
      scope.$digest();


      // scroll to page bottom and
      // give focus to newly added input text
      jQuery("html, body").animate({ scrollTop: jQuery(document).height() }, 500);
      jQuery('input:last').focus();
    }


    // events

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