"use strict";

App.service("PromptService", function($templateCache, $timeout) {
  
  this.processing = function(parent) {
    $("body").append(function () {
      return $templateCache.get('shared/prompt-process-indicator.html');
    });
  };

  this.saved = function() {
    var block = ".prompt-indicator";

    $(block).remove();

    $("body").append(function () {
      return $templateCache.get("shared/prompt-done-indicator.html");
    });

    $(block + " " + ".alert").append("saved.");

    $timeout(function () {
      $(block).addClass('fadeOut');
    }, 3000);

    $timeout(function () {
      $(block).remove();
    }, 5000);
  };

});