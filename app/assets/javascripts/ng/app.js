'use strict';

var App = angular.module('Hoemwerk', ['ngResource', 'ui.router', 'templates']);

App.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

	$stateProvider
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: 'dashboard/dashboard.html'
		})
		.state('mystudents', {
			url: '/mystudents',
			templateUrl: 'mystudents/mystudents.html'
		})
		.state('create-question', {
			url: '/create-question',
			templateUrl: 'question/question.html',
			controller: 'QuestionController'
		})
		.state('questionnaire', {
			url: '/questionnaire',
			templateUrl: 'questionnaire/questionnaire.html',
			controller: 'QuestionnaireController'
		})
			.state('questionnaire.preview-question', {
				url: '/preview-question/:question_id',
				templateUrl: 'questionnaire/partials/preview-question.html',
				controller: 'PreviewQuestionController'
			});

	// Default fall back route
	$urlRouterProvider.otherwise('/create-question');

	// Remove hash on the url
	$locationProvider.html5Mode(true);
});
