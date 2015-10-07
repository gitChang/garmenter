'use strict';

App.directive('deleteScannedGarment',
function ( $compile, $templateCache, HelperSvc ) {

  function linker (scope, element) {

    function processDelete () {

      var $elemParent = element.closest('.row');
      var $garmentNumber = $elemParent.find('.garment-barcode-number')
                          .val()
                          .trim()
                          .toUpperCase();

      // deleting garment scanned
      scope.model.garment_barcodes.forEach( function ( item, index, object ) {
        // compare
        if ( item === $garmentNumber ) {
          object.splice( index, 1 );
          scope.$apply();

          // animate remove element for emphasis
          $elemParent.addClass('animated');
          $elemParent.addClass('fadeOut');

          setTimeout( function () { $elemParent.remove(); }, 1000 );
        }
      })
    }


    element.on('click', function () { processDelete(); });
  }

  return {
    restrict: 'C',
    link: linker
  };
});