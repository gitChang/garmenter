'use strict';

App.service('DaemonSvc', function ( $rootScope, $state, HelperSvc ) {

  // ???
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
    console.log( 'state: ', $state.current.name );
    console.log( 'invoice: ', $hs.getInvoiceNumber() );
    console.log( 'coll: ', JSON.stringify( $hs.getRecentInvoiceCollection() ) );
    console.log( 'hist: ', JSON.stringify( $hs.getHistoryInvoiceCollection() ) );

  })

})