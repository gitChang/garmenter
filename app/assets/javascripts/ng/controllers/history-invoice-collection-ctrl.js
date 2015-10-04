'use strict';

App.controller('HistoryInvoiceCollection', function ($scope, SharedSvc) {

  $scope.invoices = SharedSvc.historyInvoiceCollection;

  // get the total garments of the invoice
  // and display it to panel footer.
  $scope.getGarmentsTotal = function (idx) {
    return Object.keys($scope.invoices[idx].garment_barcodes).length;
  }
});