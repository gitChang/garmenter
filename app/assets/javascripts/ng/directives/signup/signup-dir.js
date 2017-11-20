'use strict';

App.directive('signup', function ($state, $window, $templateCache, HelperSvc) {

  function linker (scope, element) {

    //
    // variables
    //
    var $hs = HelperSvc;

    //
    // methods
    //
    function showProcessing() {
      $hs.indicateProcessing(element);
    }

    function processSignup() {
      $.ajax({
        url: Routes.signup_index_path(),
        type: 'post',
        data: $hs.injectAuthToken(scope.model),
        dataType: 'json',
        beforeSend: showProcessing()
      })
      .done(function () {
        $window.location.pathname = '/login';
      })
      .fail(function (error) {
        var key = error.responseJSON[0], msg = error.responseJSON[1];
        // hightlight error field and display message
        scope.pointInvalid(key, msg );
      })
      .always(function () {
        $hs.stopIndicateProcessing(element);
      })
    }

    //
    // callbacks
    //
    function callbackSignup(event) {
      event.preventDefault();

      // ignore event when processing
      if (element.find('.fa-spinner').length) return;

      setTimeout(function () {
        processSignup()
      }, 1000)
    }

    //
    // events
    //
    element.on('click', callbackSignup);

  }

  return {
    restrict: 'C',
    link: linker
  };

});