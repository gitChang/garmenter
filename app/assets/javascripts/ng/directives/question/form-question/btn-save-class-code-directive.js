'use strict';

App.directive('saveClassCode', function (PromptService, ClassCodesResource, ErrorDisplayFactory) {

  function Link(scope, element) {

    element.bind('click', function () {

      // new class code value.
      var new_class_code = $('input[name=new_class_code]').val().trim().toUpperCase();

      // POST new class code to backend and
      // append to the class code collection.
      if (new_class_code && scope.valid_discipline()) {

        PromptService.processing();

        ClassCodesResource.save
          ({
            question_discipline: scope.model.question_discipline,
            question_class_code: new_class_code
          })
          // when success ...
          .$promise.then(function () {

            // append to collection if present.
            if (scope.collection.class_codes[scope.model.question_discipline])
              scope.collection.class_codes[scope.model.question_discipline].push(new_class_code);

            // created new collection instead.
            else
              scope.collection.class_codes[scope.model.question_discipline] = [new_class_code];

            // indicate saving.
            PromptService.saved();

            $('input[name=new_class_code]').focus().val('');

          // upon failed ...
          }, function (res) {

            var error_display = ErrorDisplayFactory;

            // indicate failed.
            PromptService.failed();

            // display the error sent from the backend.
            error_display.set_base_selector('form[name=form-new-class-code]');
            error_display.render(res);
          });
      }
    });
  }

  return {
    restrict : 'C',
    link : Link
  };
});