'use strict';

App.controller('InvoiceScanCtrl',
  function ($scope, $state, SharedVarsSvc, SharedFnSvc) {

  $scope.timeOut = 1000;

  // clear shared var for editing entries.
  SharedFnSvc.resetSharedVarsForEditInvoice();

  // indicate number of recent invoices
  $scope.recentInvoiceScannedNumber = SharedVarsSvc.recentInvoiceCollection.length;

  // indicate number of recent invoices
  $scope.historyInvoiceCollectionLen = SharedVarsSvc.historyInvoiceCollection.length;
});