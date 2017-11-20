'use strict';

App.directive('deleteGarmentDir', function ($compile, $templateCache, $http, HelperSvc) {

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

    function countdown() {

      seconds = element.find('.cancel-timer').text();
      seconds = parseInt(seconds, 10);

      if (seconds == 1) {
        elTimer = element.find('.cancel-timer');
        // reset html content to default.
        element.html('<i class="fa fa-trash-o"></i>');
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
      element.html(_template);
      countdown(); // show timer confirm
    }

    // delete confirmed
    function deleteGarment () {
      // params
      var _invoiceBarcode = element.attr('data-invoice-number').trim().toUpperCase();
      var _garmentBarcode = element.attr('data-garment-number').trim().toUpperCase();


      $http.delete(Routes.garment_path(_garmentBarcode), {
        params: $helper.getAuthToken()
      })
      .then(function(res) {
        // delete successfull
        if (res.data === true) {
          // animate deletion
          element.parents('tr').addClass('animated');
          element.parents('tr').addClass('fadeOut');

          // change total number of garments
          setTimeout(
          function () {
            var elemParent = element.parents('.panel-default');
            var elemTotal = elemParent.find('.total-garments');
            var newTotal = parseInt(elemTotal.text()) - 1;
            var elemUnit = elemParent.find('.unit');

            // update total garments
            elemTotal.text(newTotal);
            // singularize unit if less 2
            if (newTotal < 2) elemUnit.text('Item');
            // delete tr element from table
            element.closest('tr').remove();
          },
          1000)
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
        deleteGarment();
        return;
      }

      // send confirmation
      if (element.find('.fa-trash-o').length) {
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