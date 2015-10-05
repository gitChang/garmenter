'use strict';

App.controller('ActionbarTopCtrl', function ($scope, $state, $templateCache, SharedVarsSvc) {

  // bind event to elements

  $scope.entryTitle = SharedVarsSvc.currentInvoiceNumber;

  $scope.logoutUser = function () {
    if (angular.element('.logout-user').find('.fa-spinner').length) return;

    angular.element('.logout-user').html(function () {
        return $templateCache.get('shared-tpls/processing-tpl.html');
      })

     setTimeout(function () {
        $state.go('login-page');
      }, 2000)
  }

})