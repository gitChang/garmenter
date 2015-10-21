'use strict';

App.directive('invoiceBarcodeDir', function ($state, $http, HelperSvc) {

  function linker(scope, element) {
    //
    // alias
    //
    var $helper = HelperSvc;

    //
    // methods
    //
    function saveInvoice() {
      var _spin = {
        show: function() {
          $('#spinner').removeClass('hidden');
        },
        hide: function() {
          $('#spinner').addClass('hidden');
        }
      };

      var _invoiceBarcode = element.val().toUpperCase();
      var _payload = $helper.injectAuthToken({ invoice_barcode: _invoiceBarcode });

      // prevent double call. to be fixed!
      if (element.attr('disabled')) return;

      // indicate processing.
      _spin.show();

      // validate invoice barcode
      $http.post(Routes.invoices_path(), _payload)
      .then(function(res) {
        // invoice barcode saved.
        if (res.data === true) {
          element.prop('disabled', true);
          $helper.setInvoiceBarcode(_invoiceBarcode);

          $state.go('garment-barcode-scan-page');
        }

        // got error response.
        if (typeof res.data === 'object') {
          _spin.hide();
          element.removeAttr('disabled');
          $helper.notify(res.data[1]);
        }
      }, function() {
        _spin.hide();
        $helper.notify('Could not connect to Server.');
      })
    }

    //
    // handlers, callbacks
    //
    var typingTimer, typeInterval = 2500;

    function doneTypingCallBack() {
      var e = $.Event('keyup');
      e.which = 13;
      element.trigger(e)
    }

    function inputEventHandler() {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTypingCallBack, typeInterval);
    }

    function enterEventHandler(event) {
      if ( event.which !== 13 ) return;
      saveInvoice();
    }

    //--
    // events
    //--
    element.on('input', inputEventHandler);
    element.on('keyup', enterEventHandler);

  }

  return {
    restrict: 'C',
    link: linker
  };
});