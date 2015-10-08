'use strict';

App.directive('acctData', function ($state, $templateCache) {

  function linker ( scope, element ) {

    element.on('keyup', function ( event ) {
      //
      if ( event.which !== 13 ) return;

      // next element .form-group > input
      var elemNext = element.parent().next();

      // = div.form-group
      if ( elemNext.prop('nodeName') === 'DIV' ) {
        // > input
        elemNext.find( 'input' ).focus()
      }
      // = h4
      if ( elemNext.prop('nodeName') === 'H4' ) {
        // = div.form-group > input
        elemNext.next().find( 'input' ).focus()
      }

    });

  }

  return {
    restrict: 'C',
    link: linker
  };
});