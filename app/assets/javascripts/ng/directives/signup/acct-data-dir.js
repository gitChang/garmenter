'use strict';

App.directive('acctData', function($state) {

  function linker (scope, element) {
    //--
    // callbacks
    //--
    function callbackEnter(event) {
      if (event.which !== 13) return;

      // next .form-group > input
      var elemNext = element.parent().next();

      if (elemNext.prop('nodeName') === 'DIV')
        elemNext.find('input').focus()

      if (elemNext.prop('nodeName') === 'H4')
        elemNext.next().find('input').focus()
    }

    //--
    // events
    //--
    element.on('keyup', callbackEnter);

  }

  return {
    restrict: 'C',
    link: linker
  };
});