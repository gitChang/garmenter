'use strict';

App.directive('loginBtn', function ($state, $templateCache, HelperSvc) {

  function linker (scope, element) {

    //
    // variables
    //
    var $helper = HelperSvc;

    //
    // methods
    //
    function showProcessing() {
      $helper.indicateProcessing(element);
    }


    function processLogin() {
      $.ajax({
        url: Routes.login_path(),
        type: 'post',
        data: $helper.injectAuthToken(scope.model),
        dataType: 'json',
        beforeSend: showProcessing()
      })
      .done(function () {
        $helper.removeNotify();
        location.pathname = '/invoice-barcode-scan';
      })
      .fail(function (jqXHR) {
        // stop spinner
        $helper.stopIndicateProcessing(element);

        // display message / notify
        var pendingMsg = !jqXHR.responseJSON ? null : jqXHR.responseJSON.msg;

        if (pendingMsg) {
          $helper.notify(pendingMsg);
          return;
        }

        if (jqXHR.status === 422 || jqXHR.status === 500) {
          $helper.notify('Server Error Encountered.')
          return;
        }

        // default notif. message
        $helper.notify('Invalid Account Name or Password.');

      })
    }

    //
    // event handlers
    //
    function clickEventHandler() {
      if (element.find('.fa-spinner').length) return;
      processLogin();
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