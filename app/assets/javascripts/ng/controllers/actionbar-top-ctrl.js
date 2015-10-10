'use strict';

App.controller('ActionbarTopCtrl',
function ($scope, $state, $templateCache, HelperSvc) {

  //--
  // variables
  //--
  var $hs = HelperSvc;

  $scope.entryTitle = $hs.getInvoiceNumber(); // topbat title


  //--
  // methods
  //--
  $scope.logoutUser = function () {
    // ignore when already processing
    if (angular.element('.logout-user').find('.fa-spinner').length) return;
    // spinner
    angular.element('.logout-user').html(function () {
      return $templateCache.get('shared-tpls/processing-tpl.html');
    })

    setTimeout(function () {
      $state.go('login-page');
    }, 2000)
  }

})