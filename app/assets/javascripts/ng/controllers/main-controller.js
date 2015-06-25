'use strict';

App.controller('MainController', function ($rootScope, $location, $stateParams) {

	// HIGHLIGHT SIDEBAR ELEMENT BY ASSIGNING
	// `.active` CLASS DYNAMICALLY BASE ON
	// CURRENT PATH.
	//============================================
  $rootScope.$on('$stateChangeSuccess', function() {

    // reset active element class
    $('#sidebar-left #menu li a').removeClass('active');

    switch ( $location.path() ) {
    	case '/dashboard' :
    		$('a[ui-sref="dashboard"]').addClass('active');
    		break;
    	case '/mystudents' :
    		$('a[ui-sref="mystudents"]').addClass('active');
    		break;
    	case '/create-question' :
    		$('a[ui-sref="create-question"]').addClass('active');
    		break;
    	case '/questionnaire' :
        case '/questionnaire/preview-question/' + $stateParams.question_id :
    		$('a[ui-sref="questionnaire"]').addClass('active');
    }

  });

});