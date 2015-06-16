"use strict";

App.directive("saveClassCode", function ($templateCache, ClassCodesResource) {

  function Link(scope, element) {

    element.bind("click", function () {

      var input_new_class_code = $("input[name='new_class_code']"),
          val = input_new_class_code.val().trim();

      if (val) {

        // send flag saving mode
        scope.is_processing = true;

        // add new class code to collection.
        ClassCodesResource.save({ new_class_code: val })
        .$promise.then(function (res) {
          console.log(res);

          if (scope.collection.class_codes[scope.model.discipline]) {
            // append newly created class code to collection.
            scope.collection.class_codes[scope.model.discipline].push(res.new_class_code);
          } else {
            // create new collection with newly created class code.
            scope.collection.class_codes[scope.model.discipline] = [res.new_class_code];
          }

          // send flag done saving.
          scope.is_processing = false;

          // clear and focus back to input tag.
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