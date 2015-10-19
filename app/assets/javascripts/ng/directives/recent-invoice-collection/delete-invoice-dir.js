'use strict';

App.directive('deleteInvoiceDir', function ($templateCache, $http, HelperSvc) {

  function linker (scope, element) {
    //
    // aliases
    //
    var $helper = HelperSvc;

    // countdown to auto-cancel delete action.
    // defaults to 6s.
    var seconds;
    var elTimer;
    var timeoutMyOswego;

    // original template
    var $origTemplate;

    function countdown() {

      seconds = element.find('.cancel-timer').text();
      seconds = parseInt(seconds, 10);

      if (seconds == 1) {
        elTimer = element.find('.cancel-timer');
        // reset html content to default.
        element.html($origTemplate);
        return;
      }

      seconds--;
      elTimer = element.find('.cancel-timer');
      elTimer.html(seconds);
      timeoutMyOswego = setTimeout(countdown, 1000);
    }

    // confirm delete action. change it html
    // to confirm msg
    function confirmDelete () {
      var _template = $templateCache.get('recent-invoice-collection-tpls/confirm-msg-tpl.html');
      $origTemplate = element.html(); // temp

      element.html(_template);
      countdown(); // show timer confirm
    }

    // delete confirmed
    function deleteInvoice() {
      // params
      var _invoiceBarcode = element.attr('data-invoice-number').trim().toUpperCase();
      // deleting garment scanned
      var _param_invoice = { invoice_barcode: _invoiceBarcode };

      $http.post(Routes.mark_delete_invoices_path(_param_invoice), $helper.getAuthToken())
      .then(function(res) {
        // delete successfull
        if (res.data === true) {
          // animate deletion
          element.parents('.panel-group').addClass('animated');
          element.parents('.panel-group').addClass('fadeOut');

          setTimeout(function() {
            element.parents('.panel-group').remove();
          },2000)
        }
      })
    }

    //
    // event handlers
    //
    function clickEventHandler(event) {
      event.preventDefault();

      // user confirms deletion
      if (element.find('#confirm-msg').length) {
        deleteInvoice();
        return;
      }

      // send confirmation
      if (element.text() === 'Delete Invoice') {
        confirmDelete();
        return
      }
    }

    //
    // events
    //
    element.on('click', clickEventHandler)

  }

  return {
    restrict: 'C',
    link: linker
  };
});