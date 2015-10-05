'use strict';

App.directive('saveGarments',
  function ($compile, $templateCache, $state, SharedVarsSvc, SharedFnSvc) {

  function linker (scope, element) {

    function saveInvoice () {

      var orderedKeys;

      // if invoice is for editing
      if ( SharedVarsSvc.currentInvoiceIndex !== null ) {
        alert();

        var idx = SharedVarsSvc.currentInvoiceIndex;

        // get the length of the existing invoice garment barcodes object
        var len = Object.keys( SharedVarsSvc.recentInvoiceCollection[ idx ].garment_barcodes ).length;

        // reorder the keys. base the starting on existing length garment barcodes object
        orderedKeys = SharedFnSvc.reOrderKeys( scope.model.garment_barcodes, len + 1 );

        // update || append to existing garment barcodes object
        for ( var key in orderedKeys ) {
          SharedVarsSvc.recentInvoiceCollection[ idx ].garment_barcodes[ key ] = orderedKeys[ key ];
        }

        // put timeout to see templates change
        setTimeout(function () {
          // redirect to recent collection page instead
          $state.go( 'recent-invoice-collection-page' );
        }, 2000);

      // new entry
      } else {

        // re-order keys in the object to
        // to maintain order of the next entry.
        orderedKeys = SharedFnSvc.reOrderKeys( scope.model.garment_barcodes, null );

        // replace the garment barcodes with newly reordered
        scope.model.garment_barcodes = orderedKeys;

        // save invoice
        SharedVarsSvc.recentInvoiceCollection.push( scope.model );

        // put timeout to see templates change
        setTimeout(function () {
          // redirect to invoice scan for new entry
          $state.go( 'invoice-barcode-scan-page' );
        }, 2000);
      }


      // clear edit signal vars
      SharedFnSvc.resetSharedVarsForEditInvoice();
    }


    // event click save
    element.on('click', function (event) {
      event.preventDefault();

      // trapping
      if (!Object.keys(scope.model.garment_barcodes).length) return;
      if (element.find('.fa-spinner').length) return;

      // show processing
      element.html($templateCache.get('shared-tpls/processing-tpl.html'));

      // save data
      saveInvoice();
    });
  }

  return {
    restrict: 'C',
    link: linker
  };
});
