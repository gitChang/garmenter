'use strict';

App.directive('loginBtn', function ($state, $templateCache, HelperSvc) {

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


    function processLogin() {
      $.ajax({
        url: Routes.user_sessions_path(),
        type: 'post',
        data: scope.model,
        dataType: 'json',
        beforeSend: showProcessing()
      })
      .done(function () {
        $hs.removeNotify();
        location.pathname = '/invoice-barcode-scan';
      })
      .fail(function (error) {
        // stop spinner
        $hs.stopIndicateProcessing(element);
        // display message / notify
        $hs.notify('Invalid account name or password.');
      })
    }


    //--
    // callbacks
    //--
    function callbackClick() {
      // ignore click when processing
      if (element.find('.fa-spinner').length) return;

      processLogin();
    }


    //--
    // events
    //--
    element.on('click', callbackClick)
  }

  return {
    restrict: 'C',
    link: linker
  };
})