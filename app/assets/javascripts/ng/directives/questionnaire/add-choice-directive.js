'use strict';

App.directive('addChoice', add_choice);

function add_choice () {

  function Link (scope, element) {

    scope.$watchCollection('collection.selective_letters', function (sl) {

      console.log(sl.length);

      if (sl.length > 3) {

        element.addClass('hidden');
        element.unbind('click');

      } else {

        element.removeClass('hidden');
        element.bind('click', add_choice_clicked);
      }

    });

    element.bind('click', add_choice_clicked, false);

    function add_choice_clicked () {

      var col_sletters_len = scope.collection.selective_letters.length - 1;

      scope.collection.selective_letters.push(scope.collection.letters[col_sletters_len + 1]);

      scope.$apply();

      console.log('model: ', JSON.stringify(scope.model));
    }
  };

  return {
    restrict: 'C',
    link: Link
  };
}