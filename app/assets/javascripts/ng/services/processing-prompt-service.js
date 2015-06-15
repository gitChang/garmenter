"use strict";

App.service('ProcessPromptService', function($templateCache, $timeout) {
  
  this.render = function(parent) {
    $(parent).prepend(function () {
      return $templateCache.get('shared/process-indicator.html');
    });
  };

  this.unrender = function() {
    var selector = '.process-indicator';

    $timeout(function () {
      $(selector).addClass('fadeOutUp');
    }, 1000);

    $timeout(function () {
      $(selector).remove();
    }, 4000);
  };

});