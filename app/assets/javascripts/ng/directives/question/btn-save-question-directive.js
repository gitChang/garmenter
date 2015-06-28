'use strict';

App.directive('btnSaveQuestion',
  function ($templateCache, PromptService, QuestionsResource, ErrorDisplayFactory) {

  function Link(scope, element) {

    scope.$watchCollection('model.question_answers', function (answers) {

      // hide the button save class code
      // in the form.
      if (answers.length)
        element.removeClass('hidden');
      // show when discipline model is present.
      else
        element.addClass('hidden');
    });

    element.find('button').bind('click', function () {

      // inidicate saving.
      PromptService.processing();

      // POST to backend.
      QuestionsResource.save(scope.model).$promise
      // when success ...
      .then(function () {

        // remove all error displayed.
        ErrorDisplayFactory.clear_errors();

        // clear the form and reset the model.
        scope.reset_form_model();

        PromptService.saved();
      },
      // upon failed ...
      function (res) {

        // inidicate failed.
        PromptService.failed();

        // show the error in the form.
        ErrorDisplayFactory.set_base_selector('form[name=form-new-question]');
        ErrorDisplayFactory.render(res);
      });

    });
  }

  return {
    restrict : 'C',
    link: Link
  };

});