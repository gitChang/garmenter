'use strict';

var App = angular
						.module('GarmentScanner', ['ngResource', 'ui.router', 'templates', 'angularMoment']);

App.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

	$stateProvider

		// state for questions controller.
		.state('signup-page', {
			url  				: '/signup',
			templateUrl : 'signup-page.html'
		})
		.state('login-page', {
			url  				: '/login',
			templateUrl : 'login-page.html'
		})
		.state('invoice-barcode-scan-page', {
			url  				: '/invoice-barcode-scan',
			templateUrl : 'invoice-barcode-scan-page.html',
			controller  : 'InvoiceScanCtrl'
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

	// default fall back route.
	$urlRouterProvider.otherwise('/login');

	// remove hash on the url.
	$locationProvider.html5Mode(true);

});
