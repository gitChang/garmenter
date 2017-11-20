'use strict';

App.controller('RecentInvoiceCollection', function ($scope, $http) {

  //
  // variables
  //
  $scope.invoices = null;

  // fill invoices scope with
  // recent collection (updatable)
  $http.get(Routes.recent_invoices_path())
  .then(function(res) {
    $scope.invoices = res.data;
  })

  // get the total garments of the invoice
  // and display it to panel footer.
  $scope.getGarmentsTotal = function ( idx ) {
    return $scope.invoices[ idx ].garment_barcodes.length;
  }

  // pluralize the unit of total garments
  $scope.pluralize = function ( total ) {
    return total > 1 ? 'Items' : 'Item';
  }
});