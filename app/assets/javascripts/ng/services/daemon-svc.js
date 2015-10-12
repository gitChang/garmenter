'use strict';

App.service('DaemonSvc', function ( $rootScope, $state, HelperSvc ) {

  //--
  // methods
  //--
  function verifyUserAccess() {
    // don't render login
    // on users already
    // logged in.
    $.ajax({
      url: Routes.user_access_path(),
      type: 'get'
    })
    .done(function (authorized) {
      if (authorized === true && $state.current.name === 'login-page')
          $state.go('invoice-barcode-scan-page');

      if (authorized === false) {
        if ($state.current.name !== 'login-page' && $state.current.name !== 'signup-page')
            $state.go('login-page');
      }
    })
  }


  //--
  // events
  //--
  $rootScope.$on('$stateChangeSuccess', function () {
    // inherit
    var $hs = HelperSvc;

    // clear global invoice var
    switch ( $state.current.name ) {
      case 'invoice-barcode-scan-page':
      case 'recent-invoice-collection-page':
        $hs.clearInvoiceNumber();
        break;
    }

    // log invoice collections
    //console.log( 'state: ', $state.current.name );
    //console.log( 'invoice: ', $hs.getInvoiceNumber() );
    //console.log( 'coll: ', JSON.stringify( $hs.getRecentInvoiceCollection() ) );
    //console.log( 'hist: ', JSON.stringify( $hs.getHistoryInvoiceCollection() ) );
  })


  $rootScope.$on('$stateChangeStart', function () {
    // inspect user status if already logged in.
    verifyUserAccess();
  })

  $(window).on('focus', function () {
    // inspect user status if already logged in.
    verifyUserAccess();
  })

})