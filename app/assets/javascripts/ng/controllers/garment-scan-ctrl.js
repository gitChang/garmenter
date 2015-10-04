'use strict';

App.controller('GarmentScanCtrl', function ($scope, $state, $compile, $templateCache, SharedSvc) {

  $scope.model = {
    invoice_number: null,
    garment_barcodes: {}
  };

  // indicates the realtime length og garments
  $scope.garmentScannedLen = 0;

  // invoice number is required,
  // so if not present, goto invoice scan page
  if (!SharedSvc.currentInvoiceNumber) {
    $state.go('invoice-barcode-scan-page');
    return;
  }

  // get the invoice number on shared service
  $scope.model.invoice_number = SharedSvc.currentInvoiceNumber.toString();

  // create barcode img using the number scanned.
  // display barcode canvas element on page.
  jQuery('#invoice-barcode-pic').JsBarcode($scope.model.invoice_number, {
    width: 2,
    height: 70,
    lineColor: '#eee',
    displayValue: true
  });

  // put save garment tpl on action bar
  jQuery('#save-garment-parent').html(function () {
    return $compile($templateCache.get('garment-scan-tpls/garment-save-tpl.html'))($scope);
  });

  // update the badge count.
  $scope.$watch('model.garment_barcodes', function (garments) {
    console.log($scope.model.garment_barcodes);
    // get the normal length
    $scope.garmentScannedLen = Object.keys(garments).length;
    // get the null valued elem and deduce.
    for (var key in garments) {
      if (garments[key] === null) $scope.garmentScannedLen -= 1;
    }
  }, true);
});