'use strict';

App.controller('InvoiceScanCtrl', function ($scope, $state, SharedSvc) {

  $scope.timeOut = 1000;

  // indicate number of recent invoices
  $scope.recentInvoiceScannedNumber = SharedSvc.recentInvoiceCollection.length;

  // indicate number of recent invoices
  $scope.historyInvoiceCollectionLen = SharedSvc.historyInvoiceCollection.length;
});