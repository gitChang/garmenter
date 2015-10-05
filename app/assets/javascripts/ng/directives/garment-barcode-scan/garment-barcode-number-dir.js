'use strict';

App.directive('garmentBarcodeNumber', function ($compile, $templateCache, SharedFnSvc) {

  function linker (scope, element) {

    element.on('input keyup', function (event) {

      var garmentBarcode = element.val().toUpperCase().trim();
      var notifCenter = angular.element('#notif-center');


      // trapping
      if ( event.which !== 13 ) return;
      if ( SharedFnSvc.findInObject(scope.model.garment_barcodes, garmentBarcode, notifCenter) ) return;


      // remove warning
      SharedFnSvc.removeNotification(notifCenter);


      // add new garment barcode to model
      var lastKey = SharedFnSvc.getLastKey( scope.model.garment_barcodes );
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


      // log
      console.log( JSON.stringify(scope.model.garment_barcodes) );
    })
  }

  return {
    restrict: 'C',
    link: linker
  }
});