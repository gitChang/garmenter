'use strict';

App.controller('RecentInvoiceCollection', function ($scope, SharedSvc) {
  // invoice collection
  $scope.invoices = SharedSvc.recentInvoiceCollection;

  // get the total garments of the invoice
  // and display it to panel footer.
  $scope.getGarmentsTotal = function (idx) {
    return Object.keys($scope.invoices[idx].garment_barcodes).length;
  }
});