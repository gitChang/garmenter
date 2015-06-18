"use strict";

App.directive("body", Body);

function Body($rootScope, PromptService) {
  
  function Link() {
    
    // upon submit, indicate the process.
    // this partial must prepended to target 
    // DOM element.
    $rootScope.$watch('is_processing', function (val) {
      
      if (val == true) {
        PromptService.processing();
      }

      if (val == false) {
        PromptService.saved();
      }
    });
  }

  return {
    restrict: "E",
    link: Link
  };
}