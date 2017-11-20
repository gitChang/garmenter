'use strict';

App.controller('ScanResultCtrl', function($window, $stateParams, $cookies) {

  $(Routes.cookie_barcode_path($stateParams.barcode), function() {
    close();
  })

})