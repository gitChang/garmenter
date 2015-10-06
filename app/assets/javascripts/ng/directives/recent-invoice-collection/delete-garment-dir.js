'use strict';

App.directive('deleteGarment', function ($compile, $templateCache, SharedVarsSvc) {
  function linker (scope, element) {
    // countdown to auto-cancel delete action.
    // defaults to 6s.
    var seconds;
    var elTimer;
    var timeoutMyOswego;

    function countdown() {

      if (element.find('.fa-spinner').length) return;

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
      // replace text with confirm intent
      element.html($templateCache.get('recent-invoice-collection-tpls/confirm-msg-tpl.html'));
      // show timer cancel
      countdown();
    }


    // user click event
    element.on('click', function (event) {
      event.preventDefault();

      // user confirms deletion
      if ( element.find('#confirm-msg').length ) {

        var invoiceNumber = element.attr('data-invoice-number').trim();
        var garmentNumber = element.attr('data-garment-number').trim();
        var invoiceIndex = element.attr('data-idx').trim();

        // delete garment from the invoice
        SharedVarsSvc.recentInvoiceCollection.forEach(function (item, index, object) {
          if (item.invoice_number === invoiceNumber) {
            for (var key in item.garment_barcodes) {
              if (item.garment_barcodes[key] === garmentNumber) {

                // animate deletion
                element.parents('tr').addClass('animated');
                element.parents('tr').addClass('fadeOut');

                // change total on the footer
                // delete the garment number from array
                setTimeout(function () {
                  var elemParent = element.parents('.panel-default');
                  var elemTotal = elemParent.find('.total-garments');
                  var newTotal = parseInt( elemTotal.text() ) - 1;
                  var elemUnit = elemParent.find('.unit');
                  elemTotal.text( newTotal );
                  if ( newTotal < 2 ) elemUnit.text('Garment');
                }, 1000)

                // delete the garment number from array
                setTimeout(function () {
                  // delete garment
                  delete item.garment_barcodes[key];
                }, 1000)

                // delete the row
                setTimeout(function () {
                  // delete tr element from table
                  element.closest('tr').remove();
                }, 1000)
              }
            }
          }
        })
      }

      //
      if (element.find('.fa-trash-o').length) {
        confirmDelete();
      }
    })
  }

  return {
    restrict: 'C',
    link: linker
  };
});