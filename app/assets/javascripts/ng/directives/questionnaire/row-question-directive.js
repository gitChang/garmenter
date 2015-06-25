'use strict';

App.directive('trQuestion', table_row_question);

function table_row_question ($stateParams) {

  function Link (scope, element) {
  }

  return {
    restrict: 'C',
    link: Link
  };
}