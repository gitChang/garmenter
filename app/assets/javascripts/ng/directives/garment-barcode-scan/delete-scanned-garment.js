'use strict';

App.directive('deleteScannedGarment', function ($compile, $templateCache) {

  function linker (scope, element) {

    function processDelete () {
      var elemParent = element.closest('.row');
      var garmentNumber = element.closest('.row')
                          .find('.garment-barcode-number')
                          .val()
                          .trim()
                          .toUpperCase();

      // deleting garment scanned
      for ( var key in scope.model.garment_barcodes ) {

        if (scope.model.garment_barcodes[key] === garmentNumber) {
          delete scope.model.garment_barcodes[key];
          scope.$apply();

          // animate remove element for emphasis
          elemParent.addClass('animated');
          elemParent.addClass('fadeOut');

          setTimeout( function () { elemParent.remove(); }, 1000 );
        }
      }
    }


    element.on('click', function () { processDelete(); });
  }

  return {
    restrict: 'C',
    link: linker
  };
});