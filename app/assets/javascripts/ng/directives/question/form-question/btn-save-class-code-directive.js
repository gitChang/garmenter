'use strict';

App.directive("saveClassCode", function ($timeout, $templateCache, ProcessPromptService) {

  function Link(scope, element) {

    element.bind("click", function () {
      var input_new_class_code = $("input[name='new_class_code']");
      var val = input_new_class_code.val().trim();
      var arr_val = [val];

      if (val) {
        /**
        * upon submit, indicate the process.
        * this partial must prepended to target 
        * DOM element.
        **/
        ProcessPromptService.render('.create-question-section');

        /**
        * Add new class code to collection.
        **/
        if (scope.collection.class_codes[scope.model.discipline]) {
          scope.collection.class_codes[scope.model.discipline].push(val);
        } else {
          scope.collection.class_codes[scope.model.discipline] = arr_val;
        }

        /**
        * indicate done by removing processing prompt
        **/
        ProcessPromptService.unrender();
      }

      input_new_class_code.focus().val("");
    });
  }

  return {
    restrict : "C",
    link : Link
  };
});