'use strict';

App.controller('TestCtrl', function ($scope, $http) {

  function find(callback) {
    $http.get(Routes.find_barcode_path('sdfsdf'))
    .then(function (response) {
      return response.data;
    })
    $.ajax({
      url: Routes.find_barcode_path('sdfsdf'),
      type: 'get'
    })
    .done(function (data) {
      callback(data);
    })
    .fail(function() {
      alert();//self.notify('Server Error Encountered');
    })
  }

  find(function(data) {
    alert(data);
  })


})