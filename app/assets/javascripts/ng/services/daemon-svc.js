'use strict';

App.service('DaemonSvc', function ( $rootScope, $state, $window, HelperSvc ) {

  //
  // variables
  //

  var $hs = HelperSvc;

  //
  // methods
  //

  function verifyUserAccess() {
    if ($state.current.name === 'login-page' || $state.current.name === 'signup-page')
      return;
    // don't render login
    // on users already
    // logged in.
    $.ajax({
      url: Routes.user_access_path(),
      type: 'get'
    })
    .done(function (authorized) {
      if (authorized === true && $state.current.name === 'login-page')
        $window.location.pathname = '/invoice-barcode-scan';

      if (authorized === false) {
        if ($state.current.name !== 'login-page' && $state.current.name !== 'signup-page')
          $window.location.pathname = '/login';
      }
    })
  }

  //
  // events
  //

  $rootScope.$on('$stateChangeSuccess', function () {
    // clear global invoice variable
    switch ( $state.current.name ) {
      case 'invoice-barcode-scan-page':
      case 'recent-invoice-collection-page':
        $hs.clearInvoiceNumber();
        break;
    }

    // inspect user status if already logged in.
    verifyUserAccess();

    // log invoice collections
    console.log( 'state: ', $state.current.name );
    console.log( 'invoice: ', $hs.getInvoiceNumber() );
    console.log( 'coll: ', JSON.stringify( $hs.getRecentInvoiceCollection() ) );
    console.log( 'hist: ', JSON.stringify( $hs.getHistoryInvoiceCollection() ) );
  })

  $(window).on('focus', function () {
    // inspect user status if already logged in.
    verifyUserAccess();
  })

})