'use strict';

App.directive( 'garmentBarcodeNumber',
function ( $compile, $templateCache, HelperSvc ) {

  function linker ( scope, element ) {

    // inherit
    var $hs = HelperSvc;
    // garment number
    var $garmentNumber;


    function processGarment () {
      // garment barcode value
      $garmentNumber = element.val().trim().toUpperCase();
      // check if not empty
      if ( !$garmentNumber ) return;

      // check duplicate barcode
      var duplicated = $hs.findBarcodeDuplicate( $garmentNumber, scope.model.garment_barcodes );

      if ( duplicated ) {
        element.select().focus();
        return;
      }

      // locked this to prevent adding new tpl
      element.prop('disabled', true);

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
      scope.pushGarment( $garmentNumber );


      // allow user to delete the garment entry.
      element.parents('.row').find('.delete-scanned-garment').removeClass('hidden');


      // create new template with a temp key number label.
      scope.newGarmentScanTemplate( scope.tempLastOrder );


      // scroll to page bottom and
      // give focus to newly added input text
      jQuery("html, body").animate({ scrollTop: jQuery(document).height() }, 500);
      jQuery('input:last').focus();
    }


    // auto enter after scanned
    var typingTimer; // hols timeout object
    var typeInterval = 2500; // interval ajax request

    function doneTypingCallBack() {
      var e = $.Event('keyup');
      e.which = 13;
      element.trigger(e)
    }


    //--
    // events
    //--

    element.on('input', function() {
      // clears the timeout object to avoid stuck request.
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTypingCallBack, typeInterval);
    })

    element.on('keyup', function ( event ) {
      if ( event.which !== 13 && element.val().length) return;
      processGarment();
    })
  }

  return {
    restrict: 'C',
    link: linker
  }
});