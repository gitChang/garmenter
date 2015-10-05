'use strict';

App.directive('deleteScannedGarment', function ($compile, $templateCache) {

  function linker (scope, element) {

    element.on('click', function () {

      // trapping
      if ( scope.garmentScannedLen < 2 && element.val().trim() === '' ) return;

      var elemParent = element.closest('.row');
      var garmentNumber = element.closest('.row').find('.garment-barcode-number').val().trim();


      // deleting garment scanned
      for ( var key in scope.model.garment_barcodes ) {

        if (scope.model.garment_barcodes[key].toLowerCase() === garmentNumber.toLowerCase()) {
          delete scope.model.garment_barcodes[key];
          scope.$apply();

          // animate remove element for emphasis
          elemParent.addClass('animated fadeOut');
          elemParent.addClass('fadeOut');

          setTimeout(function () {
            elemParent.remove();
          }, 1000)
        }
      }
    });
  }

  return {
    restrict: 'C',
    link: linker
  };
});