'use strict';

App.controller( 'InvoiceScanCtrl', function ( $scope, $state, $cookies, HelperSvc ) {

  var $hs = HelperSvc;
  var $host = $(location).attr('host');


  // indicate number of recent invoices
  $scope.sizeRecentInvoiceCollection = $hs.getSizeRecentInvoiceCollection();

  // indicate number of recent invoices
  $scope.sizeHistoryInvoiceCollection = $hs.getSizeHistoryInvoiceCollection();

  //
  $scope.ZXingURL = 'zxing://scan/?ret=http%3A%2F%2F' +  encodeURI($host) + '%2Fscan-result%2F%7BCODE%7D';

  //--
  // events
  //--

});