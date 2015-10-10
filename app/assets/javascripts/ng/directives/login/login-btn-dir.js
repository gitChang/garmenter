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
        url: Routes.login_path(),
        type: 'post',
        data: scope.model,
        dataType: 'json',
        beforeSend: showProcessing()
      })
      .done(function () {
        $hs.removeNotify();
        location.pathname = '/invoice-barcode-scan';
      })
      .fail(function (jqXHR) {
        // stop spinner
        $hs.stopIndicateProcessing(element);
        // display message / notify
        if (jqXHR.status === 500) {
          $hs.notify('Server Error Encountered.');
          return;
        }

        var key = Object.keys(jqXHR.responseJSON)[0];

        if (key === 'msg') {
          $hs.notify(jqXHR.responseJSON.msg);
          return;
        }

        $hs.notify('Invalid Account Name or Password.');

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