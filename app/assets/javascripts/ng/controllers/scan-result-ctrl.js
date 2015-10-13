'use strict';

App.controller('ScanResultCtrl', function($window, $stateParams) {

  $.get(Routes.cookie_barcode_path($stateParams.barcode), function(data) {
    $window.close();
  })

})