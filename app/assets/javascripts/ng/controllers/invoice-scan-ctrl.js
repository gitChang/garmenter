'use strict';

App.controller( 'InvoiceScanCtrl', function ($scope, $http) {

  // indicate number of recent invoices
  $scope.sizeRecentCollection = null;
  // indicate number of recent invoices
  $scope.sizeHistoryCollection = null;


  // get the total of recent collection
  $http.get(Routes.recent_size_invoices_path())
  .then(function(res) {
    if (typeof res.data === 'number') $scope.sizeRecentCollection = res.data;
  })

  // get the total of collection history
  $http.get(Routes.history_size_invoices_path())
  .then(function(res) {
    if (typeof res.data === 'number') $scope.sizeHistoryCollection = res.data;
  })

});