'use strict';

App.directive('deleteScannedGarment', function ($compile, $templateCache) {

  function linker (scope, element) {
    element.on('click', function () {
      // if only has one garment scanned or none
      // then do not delete this element
      if (scope.garmentScannedLen < 1 && element.val().trim() === '') return;

      var elParent = element.closest('.row');
      var garmentNumber = element.closest('.row').find('.garment-barcode-number').val().trim();

      for (var key in scope.model.garment_barcodes) {
        if (scope.model.garment_barcodes[key] === garmentNumber) {
          delete scope.model.garment_barcodes[key];
          elParent.remove();
        }
      }
    });
  }

  return {
    restrict: 'C',
    link: linker
  };
});