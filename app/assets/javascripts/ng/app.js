'use strict';

//
// variables
//
var App = angular.module('GarmentScanner', [
	'ngResource', 'ngCookies', 'ui.router', 'templates', 'angularMoment'
]);

//
// callbacks
//
function configCallback($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
		.state('test-page', {
			url: '/test',
			controller: 'TestCtrl'
		})
		.state('signup-page', {
			url  				: '/signup',
			templateUrl : 'signup-page.html',
			controller  : 'SignupCtrl'
		})
		.state('login-page', {
			url  				: '/login',
			templateUrl : 'login-page.html',
			controller  :  'LoginCtrl'
		})
		/**
		.state('request-password-reset-page', {
			url  				: '/password_reset',
			templateUrl : 'request-password-reset-page.html',
			controller  : 'RequestPasswordResetCtrl'
		})
		.state('password-reset-page', {
			url  				: '/password-reset/:id',
			templateUrl : 'password-reset-page.html'
		})
		**/
		.state('invoice-barcode-scan-page', {
			url  				: '/invoice-barcode-scan',
			templateUrl : 'invoice-barcode-scan-page.html',
			controller  : 'InvoiceScanCtrl',
		})
		.state('garment-barcode-scan-page', {
			url  				: '/garment-barcode-scan',
			templateUrl : 'garment-barcode-scan-page.html',
			controller  : 'GarmentScanCtrl'
		})
		.state('recent-invoice-collection-page', {
			url  				: '/recent-invoice-collection',
			templateUrl : 'recent-invoice-collection-page.html',
			controller  : 'RecentInvoiceCollection'
		})
    .state('history-invoice-collection-page', {
      url  				: '/history-invoice-collection',
      templateUrl : 'history-invoice-collection-page.html',
      controller  : 'HistoryInvoiceCollection'
    });

	$urlRouterProvider.otherwise('/login');			// default fall back route.
	$locationProvider.html5Mode(true);					// remove hash on the url.
}

//
// configs
//
App.config(configCallback).run(['DaemonSvc', function (DaemonSvc) {
	// initiate daemon service by injecting on run()
}]);
