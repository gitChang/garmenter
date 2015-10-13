'use strict';

App.service('DaemonSvc', function ( $rootScope, $state, $cookies, HelperSvc ) {

  //--
  // variables
  //--

  var $hs = HelperSvc;


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


  function putScannedBarcode() {
    switch ($state.current.name) {
      case 'invoice-barcode-scan-page':
      case 'garment-barcode-scan-page':

        if ($cookies.get('barcode') && $cookies.get('barcode').length) {

          var input = $('input:last');

          input.val($cookies.get('barcode'))

          // trigger enter key here with timeout
          setTimeout(function() {
            var e = $.Event('keyup');

            e.which = 13;

            input.trigger(e)

            // clear prev cookie barcode
            // to avoid dups
            $hs.clearCookieBarcode();

          }, 1500)
        }

        break;
    }
  }


  //--
  // events
  //--

  $rootScope.$on('$stateChangeSuccess', function () {
    // clear global invoice var
    // and cookie barcode
    switch ( $state.current.name ) {
      case 'invoice-barcode-scan-page':
      case 'recent-invoice-collection-page':
        $hs.clearInvoiceNumber();
        $hs.clearCookieBarcode();
        break;
    }

    // log invoice collections
    console.log( 'state: ', $state.current.name );
    console.log( 'invoice: ', $hs.getInvoiceNumber() );
    console.log( 'coll: ', JSON.stringify( $hs.getRecentInvoiceCollection() ) );
    console.log( 'hist: ', JSON.stringify( $hs.getHistoryInvoiceCollection() ) );
  })


  $rootScope.$on('$stateChangeStart', function () {
    // inspect user status if already logged in.
    verifyUserAccess();
  })

  $(window).on('focus', function () {
    // inspect user status if already logged in.
    verifyUserAccess();

    // assign the cookie barcode cookie to the
    // last input.
    putScannedBarcode();
  })

})