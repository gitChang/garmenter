'use strict';

App.directive('recentCollectionDir', function ($state) {

  function linker (scope, element) {
    //
    // event handlers
    //
    function clickEventHandler(event) {
      event.preventDefault();
      $state.go('recent-invoice-collection-page');
    }

    //
    // events
    //
    element.on('click', clickEventHandler)
  }

  return {
    restrict: 'C',
    link: linker
  };
})