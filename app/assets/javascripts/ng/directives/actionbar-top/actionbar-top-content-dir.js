'use strict';

App.directive('actionbarTopContent', function ($rootScope, $state, $compile, $templateCache) {

  function linker (scope, element) {

    // change the actionbar content base on state name
    $rootScope.$on('$stateChangeSuccess',
    function (event, toState, toParams, fromState, fromParams) {
      event.preventDefault();

      console.log($state.current.name);

      switch ($state.current.name) {
        case 'login-page':
          element.html(function () {
            return $compile($templateCache.get('actionbar-top-tpls/login-content.html'))(scope);
          })
          break;

        case 'signup-page':
          element.html(function () {
            return $compile($templateCache.get('actionbar-top-tpls/signup-content.html'))(scope);
          })
          break;

        default :
          element.html(function () {
            return $compile($templateCache.get('actionbar-top-tpls/common-content.html'))(scope);
          })
          break;
      }
    })
  }

  return {
    retrict: 'E',
    link: linker
  };
})