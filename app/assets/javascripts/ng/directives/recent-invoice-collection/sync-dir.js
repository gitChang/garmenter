'use strict';

App.directive('sync', function ($state, $templateCache, $http, HelperSvc) {
  // processing indicator template.
  // place it here for link template accessible.
  var $template = '<i class="fa fa-refresh"></i>Sync';

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

    //
    // methods
    //
    function countdown() {
      if (element.find('.fa-spin').length) return;

      seconds = element.find('.cancel-timer').text();
      seconds = parseInt(seconds, 10);

      if (seconds == 1) {
        elTimer = element.find('.cancel-timer');
        // reset html content to default.
        element.html($template);
        return;
      }

      seconds--;
      elTimer = element.find('.cancel-timer');
      elTimer.html(seconds);
      timeoutMyOswego = setTimeout(countdown, 1000);
    }

    // confirm sync action. change it html
    // to confirm msg
    function confirmSync () {
      // replace text with confirm intent
      var _template = $templateCache.get('recent-invoice-collection-tpls/confirm-msg-tpl.html');
      element.html(_template);
      countdown();
    }

    function closeInvoice () {
      // show process syncing
      element.html('<i class="fa fa-refresh fa-spin"></i>');

      $http.post(Routes.close_recent_invoices_path(), $helper.getAuthToken())
      .then(function(res) {
        if (res.data === true) $state.go('invoice-barcode-scan-page');
      })
    }

    //
    // event handlers
    //
    function clickEventHandler(event) {
      event.preventDefault();

      // if nothing to sync
      if (!jQuery('table tbody tr').length) return;

      // ignore event when processing
      if (element.find('.fa-refresh.fa-spin').length) {
        return;
      }

      // ask to confirm sync
      if (element.find('.fa-refresh').length) {
        confirmSync();
        return;
      }

      // user confirms sync
      if (element.find('#confirm-msg').length) {
        closeInvoice();
        return;
      }
    }

    //
    // events
    //
    element.on('click', clickEventHandler);
  }

  return {
    restrict: 'C',
    template: $template,
    link: linker
  };
});