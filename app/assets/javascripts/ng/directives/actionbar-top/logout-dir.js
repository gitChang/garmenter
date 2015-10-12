'use strict';

App.directive('logoutUser', function ($compile, HelperSvc) {

  function linker (scope, element) {

    //--
    // variables
    //--
    var $hs = HelperSvc;


    //--
    // methods
    //--
    function showProcessing() {
      $hs.indicateProcessing(element);
    }


    function processLogout() {
      $.ajax({
        url: Routes.logout_path(),
        data: $hs.getAuthToken(),
        dataType: 'json',
        type: 'post',
        beforeSend: showProcessing()
      })
      .done(function () {
        $hs.removeNotify();
        location.pathname = '/login';
      })
      .fail(function (jqXHR) {
        // stop spinner
        $hs.stopIndicateProcessing(element);

        if (jqXHR.status === 500)
          $hs.notify('Server Error Encountered.');

      })
    }


    //--
    // callbacks
    //--
    function callbackClick () {
      processLogout();
    }


    //--
    // events
    //--
    element.on('click', callbackClick);

  }


  return {
    restrict: 'C',
    link: linker
  };
})