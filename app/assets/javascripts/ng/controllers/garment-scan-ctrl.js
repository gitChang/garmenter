'use strict';

App.controller('GarmentScanCtrl',
function ($scope, $state, $compile, $templateCache, $http, HelperSvc) {

  //
  // aliases
  //
  var $helper = HelperSvc;

  //
  // variables
  //
  $scope.invoiceBarcode = $helper.getInvoiceBarcode();
  $scope.garmentQuantity = null; // bound to badge

  // invoice barcode is required,
  // if not present, goto invoice scan page.
  if (!$scope.invoiceBarcode) {
    $state.go('invoice-barcode-scan-page');
    return;
  }

  // indicate invoice barcode on topbar
  $http.get(Routes.find_barcode_path($scope.invoiceBarcode))
  .then(function(res) {
    var _text = (res.data === true ? 'UPDATE: ' : 'NEW: ') + $scope.invoiceBarcode;
    $('.navbar-brand').text(_text);
  })

  // create barcode img using the number scanned.
  // display barcode canvas element on page.
  $('#invoice-barcode-pic').JsBarcode($scope.invoiceBarcode, {
    width: 2,
    height: 60,
    lineColor: '#eee'
  });


  // create a new tpl for asking new entry
  // of garment barcode.
  $scope.newTemplate = function () {
    var _template = $templateCache.get('garment-scan-tpls/new-garment-scan-tpl.html');

    $http.get(Routes.quantity_garments_path($scope.invoiceBarcode))
    .then(function(res) {

      _template = _template.replace('$', res.data + 1);

      $('new-garment-scan-dir').append(function() {
        return $compile(_template)($scope);
      })

      // scroll to the new element created
      $('html, body').animate({ scrollTop: $(document).height() }, 500);
      $('input:last').focus();
    })
  }

  // update the badge invoice quantity
  $scope.getQuantity = function() {
    $http.get(Routes.quantity_garments_path($scope.invoiceBarcode))
    .then(function(res) {
      $scope.garmentQuantity = res.data;
    })
  }

  // initialize template
  $scope.newTemplate();

});