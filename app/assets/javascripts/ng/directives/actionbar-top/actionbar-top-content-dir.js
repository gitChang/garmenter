'use strict';

App.directive('actionbarTopContent', function ($rootScope, $state, $compile, $templateCache) {

  function linker (scope, element) {

    // change the actionbar content base on state name
    $rootScope.$on('$stateChangeSuccess',
    function (event, toState, toParams, fromState, fromParams) {
      event.preventDefault();


      switch ($state.current.name) {
        case 'login-page':
          element.html(function () {
            return $compile($templateCache.get('actionbar-top-tpls/login-content-tpl.html'))(scope);
          })
          break;

        case 'signup-page':
          element.html(function () {
            return $compile($templateCache.get('actionbar-top-tpls/signup-content-tpl.html'))(scope);
          })
          break;

        case 'password-reset-page':
          element.html(function () {
            return $compile($templateCache.get('actionbar-top-tpls/password-reset-content-tpl.html'))(scope);
          })
          break;

        case 'request-password-reset-page':
          element.html(function () {
            return $compile($templateCache.get('actionbar-top-tpls/request-password-reset-content-tpl.html'))(scope);
          })
          break;

        case 'invoice-barcode-scan-page':
          element.html(function () {
            return $compile($templateCache.get('actionbar-top-tpls/invoice-scan-content-tpl.html'))(scope);
          })
          break;

        case 'garment-barcode-scan-page':
          element.html(function () {
            return $compile($templateCache.get('actionbar-top-tpls/garment-scan-content-tpl.html'))(scope);
          })
          break;

        case 'recent-invoice-collection-page':
          element.html(function () {
            return $compile($templateCache.get('actionbar-top-tpls/recent-invoice-collection-content-tpl.html'))(scope);
          })
          break;

        case 'history-invoice-collection-page':
          element.html(function () {
            return $compile($templateCache.get('actionbar-top-tpls/history-invoice-collection-content-tpl.html'))(scope);
          })
          break;

        default:
          element.html(function () {
            return $compile($templateCache.get('actionbar-top-tpls/common-content-tpl.html'))(scope);
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