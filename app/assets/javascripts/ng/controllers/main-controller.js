"use strict";

App.controller("MainController", function ($rootScope, $location) {

	// HIGHLIGHT SIDEBAR ELEMENT BY ASSIGNING 
	// `.active` CLASS DYNAMICALLY BASE ON 
	// CURRENT PATH. 
	//============================================
  $rootScope.$on("$stateChangeSuccess", function() {
  	
    // reset active element class
    $("#sidebar-left #menu li a").removeClass("active"); 

    switch ( $location.path() ) {
    	case "/dashboard" :
    		$("a[ui-sref='dashboard']").addClass("active");
    		break;
    	case "/mystudents" :
    		$("a[ui-sref='mystuds']").addClass("active");
    		break;
    	case "/create-question" :
    		$("a[ui-sref='create-question']").addClass("active");
    		break;
    	case "/questionnaire" :
    		$("a[ui-sref='questionnaire']").addClass("active");
    } 

  });

});