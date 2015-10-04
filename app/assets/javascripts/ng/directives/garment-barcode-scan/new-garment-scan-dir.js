'use strict';

App.directive('newGarmentScanDir', function ($compile, $templateCache, SharedSvc) {

  function linker (scope, element) {

    var tpl = $templateCache.get('garment-scan-tpls/new-garment-scan.html');
    var tplCache = null;

    function setGarmentNumberAndModel () {
      // apply item number to garment item.
      // when currentGarmentBarcodesLen is present,
      // it signals modification for invoice.
      var garmentNumber =
        SharedSvc.currentGarmentBarcodesLen || Object.keys(scope.model.garment_barcodes).length + 1;

      tplCache = tpl.replace('$', garmentNumber);
    }

    function appendNewElementGarment () {
      element.append(function () {
        return $compile(tplCache)(scope);
      });

      // scroll to page bottom and
      // give focus to newly added input text
      jQuery("html, body").animate({ scrollTop: jQuery(document).height() }, 500);
      jQuery('input:last').focus();
    }

    // create initial garment element
    setGarmentNumberAndModel();
    appendNewElementGarment();
  }

  return {
    restrict: 'E',
    link: linker
  };
});