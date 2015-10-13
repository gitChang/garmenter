'use strict';

App.directive( 'saveGarments',
function ( $compile, $templateCache, $state, HelperSvc ) {

  function linker ( scope, element ) {

    // inherit
    var $hs = HelperSvc;


    function processSave () {
      // show processing
      element.html($templateCache.get('shared-tpls/processing-tpl.html'));

      // signal either saved or upated
      var update = $hs.saveInvoice( scope.model );

      if ( update ) {
        // see invoice in recent for changes
        setTimeout(
        function () {
          $state.go( 'recent-invoice-collection-page' );
        },
        2000);

      } else {
        // ready to accept new invoice again
        setTimeout(
        function () {
          $state.go( 'invoice-barcode-scan-page' );
        },
        2000);
      }
    }


    // event click save
    element.on('click', function (event) {
      event.preventDefault();

      // check if garment barcodes not empty
      if ( !scope.model.garment_barcodes.length ) return;

      // ignore when already saving
      if ( element.find('.fa-spinner').length ) return;

      // save invoice
      processSave();
    });
  }

  return {
    restrict: 'C',
    link: linker
  };
});
