'use strict';

App.directive('garmentQuantityDir', function ($templateCache, $state, HelperSvc) {

  function linker (scope, element) {
    //
    // event handlers
    //
    function clickEventHandler(event) {
      event.preventDefault();

      if ($('input[disabled]').length)
        // todo: please put param here to redirect
        // specifically on the invoice.
        $state.go('recent-invoice-collection-page');
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
