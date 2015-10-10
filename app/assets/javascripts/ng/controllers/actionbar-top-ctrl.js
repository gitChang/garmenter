'use strict';

App.controller('ActionbarTopCtrl',
function ($scope, $state, $templateCache, HelperSvc) {

  //--
  // variables
  //--
  var $hs = HelperSvc;

  $scope.entryTitle = $hs.getInvoiceNumber(); // topbar title

})