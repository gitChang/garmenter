'use strict';

App.controller('TestCtrl', function ($scope) {

  $scope.model = {
    //company_name: 'aaa',
    branch_name: 'aaa',
    contact_person_first_name: 'aaa',
    contact_person_last_name: 'aaa',
    contact_person_mobile: 'aaa',
    contact_person_email: 'aaa',
    account_name: 'aaa',
    password: 'aaa',
    confirm_password: 'aaa'
  };

  console.log(Routes.signup_index_path());
  $.post(Routes.signup_index_path(), $scope.model, function (data) {
    console.log(data);
  });

})