'use strict';

App.directive('garmentBarcodeDir', function ($compile, $templateCache, $http, HelperSvc) {

  function linker (scope, element) {

    // aliases
    var $helper = HelperSvc;

    //
    // methods
    //
    function saveGarment () {
      var _garmentBarcode = element.val().toUpperCase(),
          _payload = $helper.injectAuthToken({
            invoice_barcode: scope.invoiceBarcode,
            garment_barcode: _garmentBarcode
          });

      // prevent double call. to be fixed!
      if (element.attr('disabled')) return;

      $http.post(Routes.garments_path(), _payload)
      .then(function(res) {
        // garment barcode saved.
        if (res.data === true) {
          // remove error notify.
          $helper.removeNotify();

          element.parents('.row')
                 .find('.delete-scanned-garment-dir')
                 .removeClass('hidden');

          element.prop('disabled', true);

          // create new template with a temp key number label.
          scope.newTemplate();

          // scroll newly added input text.
          $("html, body").animate({ scrollTop: $(document).height() }, 500);
          $('input:last').focus();

          // update the badge
          // garments quantity
          scope.getQuantity();

        }

        // got error response.
        if (typeof res.data === 'object') $helper.notify(res.data[1]);
      })
    }

    var typingTimer;          // holds timeout object
    var typeInterval = 2000;  // interval ajax request

    function doneTypingCallBack() {
      var e = $.Event('keyup');
      e.which = 13;
      element.trigger(e)
    }

    //
    // event handlers
    //
    function inputEventHandler() {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTypingCallBack, typeInterval);
    }
    function enterEventHandler(event) {
      if (event.which !== 13) return;
      saveGarment();
    }

    //
    // events
    //
    element.on('input', inputEventHandler);
    element.on('keyup', enterEventHandler);
  }

  return {
    restrict: 'C',
    link: linker
  }
});