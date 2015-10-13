'use strict';

App.controller('ScanResultCtrl', function($window, $stateParams) {

  $.get(Routes.cookie_barcode_path($stateParams.barcode), function(data) {

    setTimeout(function() {
      $window.close();
    }, 1000)

  })

})