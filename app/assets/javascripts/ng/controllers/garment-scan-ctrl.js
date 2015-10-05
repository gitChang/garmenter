'use strict';

App.controller('GarmentScanCtrl',
  function ($scope, $state, $compile, $templateCache, SharedVarsSvc, SharedFnSvc) {

  $scope.model = {
    invoice_number: SharedVarsSvc.currentInvoiceNumber || null,
    garment_barcodes: {}
  };


  // indicates the realtime length og garments
  $scope.garmentScannedLen = 0;


  // invoice number is required,
  // so if not present, goto invoice scan page
  if (!$scope.model.invoice_number) {
    $state.go('invoice-barcode-scan-page');
    return;
  }


  // indicate invoice number
  setTimeout(function () {
    var text;
    if ( SharedVarsSvc.currentInvoiceIndex !== null )
      text = 'UPDATE Invoice No. ' + SharedVarsSvc.currentInvoiceNumber.toString();
    else
      text = 'Invoice No. ' + SharedVarsSvc.currentInvoiceNumber.toString();

    jQuery('.navbar-brand').text( text );
  }, 500);


  // create barcode img using the number scanned.
  // display barcode canvas element on page.
  jQuery('#invoice-barcode-pic').JsBarcode($scope.model.invoice_number, {
    width: 2,
    height: 60,
    lineColor: '#eee'
  });


  // indicate that it is for update
  $scope.oldEntry = SharedVarsSvc.currentInvoiceIndex !== null;


  $scope.newGarmentScanTemplate = function () {
    // add initial new garment entry tpl.
    var tpl = $templateCache.get( 'garment-scan-tpls/new-garment-scan-tpl.html' );
    var lastKey = SharedFnSvc.getLastKey( $scope.model.garment_barcodes );


    // assign garment order.
    tpl = tpl.replace( '$', lastKey + 1 );

    angular.element('new-garment-scan-dir').append(function () {
      return $compile( tpl )( $scope );
    })


    // scroll to page bottom and
    // give focus to newly added input text
    jQuery("html, body").animate({ scrollTop: jQuery(document).height() }, 500);
    jQuery('input:last').focus();
  }


  // initialize template
  $scope.newGarmentScanTemplate();


  // update the badge count.
  $scope.$watch('model.garment_barcodes',
  function (garments) {
    $scope.garmentScannedLen = Object.keys(garments).length;
  }, true);

});