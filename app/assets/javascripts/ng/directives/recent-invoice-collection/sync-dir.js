'use strict';

App.directive('sync', function ( $state, $templateCache, HelperSvc ) {

  // pass the scope tpl value
  // to local, for template object.
  var tpl = '<i class="fa fa-refresh"></i>Sync';


  function linker (scope, element) {

    // inherit
    var $hs = HelperSvc;

    // countdown to auto-cancel delete action.
    // defaults to 6s.
    var seconds;
    var elTimer;
    var timeoutMyOswego;


    function countdown() {

      if (element.find('.fa-spin').length) return;

      seconds = element.find('.cancel-timer').text();
      seconds = parseInt(seconds, 10);

      if (seconds == 1) {
        elTimer = element.find('.cancel-timer');
        // reset html content to default.
        element.html( tpl );
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
      element.html($templateCache.get('recent-invoice-collection-tpls/confirm-msg-tpl.html'));
      // show timer cancel
      countdown();
    }


    function makeHistory () {
      // show process syncing
      element.html( '<i class="fa fa-refresh fa-spin"></i>' );

      // try to create history
      if ( $hs.setHistory() ) {
        setTimeout (
        function () {
          // redirect to new invoice entry page
          $state.go('invoice-barcode-scan-page');
        },
        3000)
      }
    }


    element.on('click', function (event) {
      event.preventDefault();

      // if nothing to sync
      if ( !jQuery('table tbody tr').length ) return;

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
        makeHistory();
        return;
      }
    });
  }

  return {
    restrict: 'C',
    template: tpl,
    link: linker
  };
});