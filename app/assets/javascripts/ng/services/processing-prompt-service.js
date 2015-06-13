"use strict";

App.service('ProcessPromptService', function($templateCache, $timeout) {
  
  this.render = function(parent) {
    $(parent).prepend(function () {
      return $templateCache.get('shared/process-indicator.html');
    });
  };

  this.unrender = function() {
    var selector = '.process-indicator';

    setTimeout(function () {
      $(selector).addClass('fadeOutUp');
    }, 2000);

    setTimeout(function () {
      $(selector).remove();
    }, 4000);
  };

});