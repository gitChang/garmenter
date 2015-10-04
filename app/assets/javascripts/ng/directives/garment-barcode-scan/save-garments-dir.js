'use strict';

App.directive('saveGarments',
  function ($compile, $templateCache, $state, SharedVarsSvc, SharedFnSvc) {

  function linker (scope, element) {

    function saveOrUpdateInvoice () {

      // check if garment entry is for save or update
      if (SharedVarsSvc.currentGarmentBarcodesLen) {

        // update or append to invoice garment barcodes.
        SharedVarsSvc.recentInvoiceCollection.forEach( function (item, index, object) {

          if (item.invoice_number === SharedVarsSvc.currentInvoiceNumber) {
            // loop thru model and get to push into existing
            // garment barcode collection of the invoice.
            var len = Object.keys(item.garment_barcodes).length;

            for (var key in scope.model.garment_barcodes) {
              item.garment_barcodes[len + 1] = scope.model.garment_barcodes[key];
            }
          }
        });

      } else {

        // or just save barcodes.
        SharedVarsSvc.recentInvoiceCollection.push(scope.model);
      }

      // clear shared var for editing entries.
      SharedFnSvc.resetSharedVarsForEditInvoice();
    }

    element.on('click', function (event) {
      event.preventDefault();

      // ignore when no items yet
      if (!Object.keys(scope.model.garment_barcodes).length) {
        return;
      }

      // ignore when already processing
      if (element.find('.fa-spinner').length) {
        return;
      }

      // show processing
      element.html($templateCache.get('shared-tpls/processing-tpl.html'));

      // put timeout to see templates change
      setTimeout(function () {
        saveOrUpdateInvoice();

        // redirect to invoice scan page for new entry
        $state.go('invoice-barcode-scan-page');
      }, 2000);
    });
  }

  return {
    restrict: 'C',
    link: linker
  };
});
