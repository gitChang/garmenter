'use strict';

App.directive('collectionHistoryDir', function ($state) {

  function linker (scope, element) {
    //
    // event handlers
    //
    function clickEventHandler(event) {
      event.preventDefault();
      $state.go('history-invoice-collection-page');
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