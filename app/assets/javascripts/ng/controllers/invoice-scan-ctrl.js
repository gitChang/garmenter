'use strict';

App.controller( 'InvoiceScanCtrl', function ( $scope, $state, $cookies, HelperSvc ) {

  var $hs = HelperSvc;

  // indicate number of recent invoices
  $scope.sizeRecentInvoiceCollection = $hs.getSizeRecentInvoiceCollection();

  // indicate number of recent invoices
  $scope.sizeHistoryInvoiceCollection = $hs.getSizeHistoryInvoiceCollection();

  //
  $scope.invoice_barcode = null;


  //--
  // events
  //--

});