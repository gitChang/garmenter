'use strict';

App.directive('garmentBarcodeNumber', function ($compile, $templateCache, SharedSvc) {

  function linker (scope, element) {

    var tpl = $templateCache.get('garment-scan-tpls/new-garment-scan.html');
    var tplCache = null;

    function pushValueToArray () {
      var garmentNumber = element.val().trim();
      var unique = true;
      var garmentsLen = Object.keys(scope.model.garment_barcodes).length;

      for (var key in scope.model.garment_barcodes) {
        if (scope.model.garment_barcodes[key] === garmentNumber) {
          unique = false;
          // clear the value
          element.select();
        }
      }

      if (unique) {
        scope.model.garment_barcodes[garmentsLen + 1] = garmentNumber;
        scope.$apply();
      }

      return unique;
    }

    function lockThisElement () {
      element.prop('disabled', true);
    }

    function setGarmentNumberAndModel () {
      // set a number of new garment entry
      function getNextNumber () {
        var nextNumber;

        if (SharedSvc.currentGarmentBarcodesLen) {
          nextNumber = (parseInt(SharedSvc.currentGarmentBarcodesLen) - 1) +
                       (Object.keys(scope.model.garment_barcodes).length + 1);
        } else {
          nextNumber = Object.keys(scope.model.garment_barcodes).length + 1;
        }

        return nextNumber;
      }

      // apply item number to garment item.
      var garmentNumber = getNextNumber();

      tplCache = tpl.replace('$', garmentNumber);
    }

    function addDeleteGarmentElement () {
      var deleteGarmentTpl = $templateCache.get('garment-scan-tpls/delete-garment-tpl.html');

      element.parents('.row').find('.delete-garment-parent:last')
      .append(function () {
        return $compile(deleteGarmentTpl)(scope);
      });
      scope.$digest();
    }

    function appendNewElementGarment () {
      // ignore the garment. it is scanned.
      if (!pushValueToArray()) return;

      lockThisElement();
      setGarmentNumberAndModel();
      addDeleteGarmentElement();

      jQuery('new-garment-scan-dir').append(function () {
        return $compile(tplCache)(scope);
      });

      // scroll to page bottom and
      // give focus to newly added input text
      jQuery("html, body").animate({ scrollTop: jQuery(document).height() }, 500);
      jQuery('input:last').focus();
    }

    // using barcode scanner
    element.on('input', function () {
      var charSignal = '*';
      var inputString = jQuery(this).val().replace(/(\r\n|\n|\r)/gm, charSignal);

      if (inputString.indexOf(charSignal) !== -1) {
        alert('true');
        return;
      }

      // don't execute when end char is not present.
      if (inputString.indexOf(charSignal) === -1) return;

      // create new element garment input
      appendNewElementGarment();
    });

    // manually entered barcode number
    element.on('keyup', function(event) {
      if (event.which === 13 && element.val().trim() !== '') {
        // create new element garment input
        appendNewElementGarment();
      }
    });
  }

  return {
    restrict: 'C',
    link: linker
  }
});