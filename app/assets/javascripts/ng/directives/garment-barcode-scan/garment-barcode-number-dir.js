'use strict';

App.directive( 'garmentBarcodeNumber',
function ( $compile, $templateCache, HelperSvc ) {

  function linker ( scope, element ) {

    // inherit
    var $hs = HelperSvc;


    function processGarment () {
      // check if not empty
      if ( element.attr('disabled') || !element.val() || element.val().length <= 5 ) return;

      // check duplicate barcode
      var duplicated = $hs.findBarcodeDuplicate( element.val(), scope.model.garment_barcodes );

      if ( duplicated ) {
        element.select().focus();
        return;
      }

      // assign a value to temp key
      if ( !scope.tempLastOrder ) {
        // previous size of garments
        var previousSize = $hs.getSizeGarmentCollection() || 0;
        // cache the size.
        scope.tempLastOrder = previousSize; scope.$apply();
      }

      // increment temp key to maintain ordering.
      scope.tempLastOrder += 1; scope.$apply();


      // push garment to model
      scope.pushGarment( element.val() );


      // allow user to delete the garment entry.
      element.parents('.row').find('.delete-scanned-garment').removeClass('hidden');


      // create new template with a temp key number label.
      scope.newGarmentScanTemplate( scope.tempLastOrder );

      // locked this to prevent adding new tpl
      element.prop('disabled', true);

      // scroll to page bottom and
      // give focus to newly added input text
      jQuery("html, body").animate({ scrollTop: jQuery(document).height() }, 500);
      jQuery('input:last').focus();
    }


    // auto enter after scanned
    var typingTimer; // hols timeout object
    var typeInterval = 2000; // interval ajax request

    function doneTypingCallBack() {
      var e = $.Event('keyup');
      e.which = 13;
      element.trigger(e)
    }


    //--
    // callbacks
    //--

    function callbackInput() {
      // clears the timeout object to avoid stuck request.
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTypingCallBack, typeInterval);
    }

    function callbackEnter(event) {
      if ( event.which !== 13 ) return;
      element.off('input');
      processGarment();
    }


    //--
    // events
    //--

    element.on('input', callbackInput)

    element.on('keyup', callbackEnter)
  }

  return {
    restrict: 'C',
    link: linker
  }
});