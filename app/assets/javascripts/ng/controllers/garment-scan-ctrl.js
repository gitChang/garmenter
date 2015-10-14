'use strict';

App.controller('GarmentScanCtrl',
function ($scope, $state, $compile, $templateCache, HelperSvc) {

  //
  // variables
  //

  var $hs = HelperSvc;

  $scope.model = {
    invoice_number: $hs.getInvoiceNumber(),
    garment_barcodes: []
  };

  $scope.garmentScannedLen = 0; // bound to badge

  // invoice number is required,
  // so if not present, goto invoice scan page
  if (!$scope.model.invoice_number) {
    $state.go('invoice-barcode-scan-page');
    return;
  }


  // indicate invoice number
  setTimeout(function () {
    var text;
    if ($hs.findInvoiceRecentCollection())
      text = 'UPDATE Invoice : ' + $scope.model.invoice_number;
    else text = 'NEW Invoice : ' + $scope.model.invoice_number;
    // apply text
    jQuery('.navbar-brand').text(text);
  },500);


  // holds the ordering
  // of the gament number
  // label on the page.
  $scope.tempLastOrder;


  // create barcode img using the number scanned.
  // display barcode canvas element on page.
  jQuery('#invoice-barcode-pic')
  .JsBarcode($scope.model.invoice_number, {
    width: 2,
    height: 60,
    lineColor: '#eee'
  });


  //--
  // methods
  //--

  // create a new tpl for asking new entry
  // of garment barcode.
  $scope.newGarmentScanTemplate = function (prevOrder) {
        // template
        var tpl = $templateCache.get('garment-scan-tpls/new-garment-scan-tpl.html');
        // set the number label of the next garment
        tpl = tpl.replace('$', prevOrder + 1);
        // add to page
        angular.element('new-garment-scan-dir').append(function () {
          return $compile(tpl)($scope);
        })

        // scroll to page bottom and
        // give focus to newly added input text
        $('html, body').animate({
          scrollTop: $(document).height()
        },500);
        $('input:last').focus();
  }


  // holds the number order of the next
  // garment barcode to be scanned.
  var initialOrder = null;


  if ($hs.getSizeGarmentCollection()) {
      // this is an update transaction of the existing invoice.
      initialOrder = $hs.getSizeGarmentCollection();
  } else {
      // meaning this is a new invoice entry
      // so we have to get size on the model
      initialOrder = $scope.model.garment_barcodes.length;
  }


  // initialize template
  $scope.newGarmentScanTemplate(initialOrder);


  // save function garment
  $scope.pushGarment = function (number, order) {
        // append
        $scope.model.garment_barcodes.push(number);
        $scope.$apply();
        //log
        console.log('garment number ', number, ' pushed.')
  }


  //
  // events
  //

  // update the badge count.
  $scope.$watch('model', function (model) {
         $scope.garmentScannedLen = model.garment_barcodes.length;
         console.log('model', JSON.stringify(model));
  },true);

});