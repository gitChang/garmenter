'use strict';

App.controller('GarmentScanCtrl',
function ($scope, $state, $compile, $templateCache, SharedVarsSvc, SharedFnSvc) {

  var currInvoiceIdx = SharedVarsSvc.currentInvoiceIndex;


  $scope.model = {
    invoice_number: SharedVarsSvc.currentInvoiceNumber || null,
    garment_barcodes: {}
  };


  // holds the ordering
  // of the gament number
  // label on the page.
  $scope.lastKey = 0;
  $scope.tempLastKey;


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
    if ( currInvoiceIdx !== null )
      text = 'UPDATE Invoice : ' + $scope.model.invoice_number;
    else
      text = 'NEW Invoice : ' + $scope.model.invoice_number;

    jQuery('.navbar-brand').text( text );
  }, 500);


  // create barcode img using the number scanned.
  // display barcode canvas element on page.
  jQuery('#invoice-barcode-pic').JsBarcode($scope.model.invoice_number, {
    width: 2,
    height: 60,
    lineColor: '#eee'
  });


  // create a new tpl for asking new entry
  // of garment barcode.
  $scope.newGarmentScanTemplate = function ( key ) {
    // template
    var tpl = $templateCache.get( 'garment-scan-tpls/new-garment-scan-tpl.html' );

    // set the number label of the next garment
    tpl = tpl.replace( '$', key + 1 );

    // add to page
    angular.element('new-garment-scan-dir').append(function () {
      return $compile( tpl )( $scope );
    })

    // scroll to page bottom and
    // give focus to newly added input text
    jQuery("html, body").animate({ scrollTop: jQuery(document).height() }, 500);
    jQuery('input:last').focus();
  }


  // holds the key of the next
  // garment barcode to be scanned.
  var initialKey = null;


  if ( currInvoiceIdx === null ) {
    // meaning this is a new invoice entry
    // so we have to get base key on the model
    initialKey = SharedFnSvc.getLastKey( $scope.model.garment_barcodes );

  } else {
    // this is an update transaction of the existing invoice.
    initialKey = SharedFnSvc.getLastKey(
                 SharedVarsSvc.recentInvoiceCollection[ currInvoiceIdx ]
                 .garment_barcodes
                 );
  }


  // initialize template
  $scope.newGarmentScanTemplate( initialKey );


  // update the badge count.
  $scope.$watch('model.garment_barcodes', function (garments) {
    // log
    // console.log( garments );
    $scope.garmentScannedLen = Object.keys(garments).length;
  }, true);

});