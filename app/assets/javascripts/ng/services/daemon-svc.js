'use strict';

App.service('DaemonSvc', function ( $rootScope, $state, $window, $http, $q, HelperSvc ) {

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

  function inspectAccess() {
    var deferred = $q.defer();
    $http.get(Routes.user_access_path()).then(function(res) {
      deferred.resolve(res.data);
    })
    return deferred.promise;
  }

  console.log(inspectAccess().then(function(d) {
    return d;
  }));

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
        if (authorized !== true) {
          $state.go('login-page');
          setTimeout(function() {
            $helper.notify('You have been logged out. Please login again.');
          }, 1000);
        }
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
        if (authorized !== true) {
          $state.go('login-page');
          setTimeout(function() {
            $helper.notify('You have been logged out. Please login again.');
          }, 1000);
        }
      })
    }
  })

})