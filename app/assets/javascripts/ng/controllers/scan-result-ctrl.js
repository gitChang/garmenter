'use strict';

App.controller('ScanResultCtrl', function ($scope, $cookies, $stateParams) {

  $.get(Routes.cookie_barcode_path($stateParams.barcode), function(data) {

    $('#actionbar-top .container-fluid:first').append(function() {
      return '<h4>' + $cookies.get('barcode') + '</h4>';
    })

    setTimeout(function() {
      close();
    }, 1000);
  })

})