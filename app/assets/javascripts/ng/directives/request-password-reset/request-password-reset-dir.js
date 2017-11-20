'use strict';

App.directive('requestPasswordResetDir', function ($state, $templateCache, $http, HelperSvc) {

  function linker (scope, element) {

    //
    // aliases
    //
    var $helper = HelperSvc;

    //
    // event handlers
    //
    function clickEventHandler(event) {
      event.preventDefault();

      // ignore event when processing
      if (element.find('.fa-spinner').length) return;
      // show processing
      element.html($templateCache.get('shared-tpls/processing-tpl.html'));

      var _data = $helper.injectAuthToken(scope.model);

      $http.post(Routes.password_resets_path(), _data).then(function (res) {
        if (res.data === true) alert('Request password reset send. Please check you email.');
      })
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