'use strict';

App.directive('deleteScannedGarmentDir', function ($templateCache, $http, HelperSvc) {

  function linker (scope, element) {
    //
    // aliases
    //
    var $helper = HelperSvc;

    //
    // methods
    //
    function deleteGarment () {
      var $elemParent = element.closest('.row'),
          _garmentBarcode = $elemParent.find('.garment-barcode-dir')
                                       .val()
                                       .trim()
                                       .toUpperCase();

      $http.delete(Routes.garment_path(_garmentBarcode), {
        params: $helper.getAuthToken()
      })
      .then(function(res) {
        // delete successfull
        if (res.data === true) {
          // animate remove element for emphasis
          $elemParent.addClass('animated');
          $elemParent.addClass('fadeOut');

          setTimeout( function () { $elemParent.remove(); }, 1000 );

          // update quantity in
          // the badge.
          scope.getQuantity();
        }
      })
    }

    //
    // event handlers
    //
    function clickEventHandler() {
      deleteGarment();
    }

    //
    // events
    //
    element.on('click', clickEventHandler);

  }

  return {
    restrict: 'C',
    link: linker
  };
});