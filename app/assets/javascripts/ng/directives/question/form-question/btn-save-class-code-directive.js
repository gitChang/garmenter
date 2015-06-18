"use strict";

App.directive("saveClassCode", function ($rootScope, $templateCache, PromptService, ClassCodesResource) {

  function Link(scope, element) {

    element.bind("click", function () {

      var input_new_class_code = angular.element("input[name='new_class_code']");
      
      var val = input_new_class_code.val().trim().toUpperCase();

      var payload = { discipline: scope.model.discipline, new_class_code: val };


      if (val && scope.model.discipline) {

        PromptService.processing();

        ClassCodesResource.save(payload).$promise.then(function (res) {
          
          if (res.error) {
          
            PromptService.failed();
            scope.errors.class_code = res.error; 
          
            return;
          }
          
          if (scope.collection.class_codes[scope.model.discipline]) {

            scope.collection.class_codes[scope.model.discipline].push(val);
          
          } else {
            
            scope.collection.class_codes[scope.model.discipline] = [res.new_class_code];
          }

          PromptService.saved();

          scope.errors.class_code = null;

          input_new_class_code.focus().val("");
        });
      }
    });
  }

  return {
    restrict : "C",
    link : Link
  };
});