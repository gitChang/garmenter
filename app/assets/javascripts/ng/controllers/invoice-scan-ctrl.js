'use strict';

App.controller( 'InvoiceScanCtrl', function ( $scope, $state, $cookies, HelperSvc ) {

  var $hs = HelperSvc;
  var $host = $(location).attr('host');


  // indicate number of recent invoices
  $scope.sizeRecentInvoiceCollection = $hs.getSizeRecentInvoiceCollection();

  // indicate number of recent invoices
  $scope.sizeHistoryInvoiceCollection = $hs.getSizeHistoryInvoiceCollection();

  //--
  // events
  //--

});