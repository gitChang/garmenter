'use strict';

App.controller('RecentInvoiceCollection', function ( $scope, HelperSvc ) {

  // inherit
  var $hs = HelperSvc;

  // invoice collection
  $scope.invoices = $hs.getRecentInvoiceCollection();

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