'use strict';

App.service('DaemonSvc', function ( $rootScope, $state, $window, HelperSvc ) {

  //
  // aliases
  //
  var $helper = HelperSvc;

  //
  // events
  //
  $rootScope.$on('$stateChangeSuccess', function () {
    // clear global invoice variable
    switch ( $state.current.name ) {
      case 'invoice-barcode-scan-page':
      case 'recent-invoice-collection-page':
            $helper.clearInvoiceBarcode();
            break;
    }
  })

  // inspect user status if already logged in.
  var protectedStates = ['login-page', 'signup-page']; //, 'request-password-reset-page', 'password-reset-page'];

  $rootScope.$on('$stateChangeStart', function(event, toState) {
    if (protectedStates.indexOf(toState.name) > -1) {
      $.ajax({
        url: Routes.user_access_path(),
        type: 'get'
      })
      .done(function (authorized) {
        if (authorized === true) $state.go('invoice-barcode-scan-page');
      })

    } else {
      $.ajax({
        url: Routes.user_access_path(),
        type: 'get'
      })
      .done(function (authorized) {
        if (authorized !== true) $window.location.pathname = '/login';
      })
    }
  })

  $(window).on('focus', function () {
    if (protectedStates.indexOf($state.current.name) > -1) {
      $.ajax({
        url: Routes.user_access_path(),
        type: 'get'
      })
      .done(function (authorized) {
        if (authorized === true) $state.go('invoice-barcode-scan-page');
      })

    } else {
      $.ajax({
        url: Routes.user_access_path(),
        type: 'get'
      })
      .done(function (authorized) {
        if (authorized !== true) $window.location.pathname = '/login';
      })
    }
  })

})