"use strict";

App.service("PromptService", function($templateCache, $timeout) {

  var parent = $("body");

  // prompt with loading icon.
  this.processing = function () {

    parent.append(function () {
      return $templateCache.get('shared/prompt-process-indicator.html');
    });
  };

  // prompt with check icon.
  this.saved = function () {
    var block = $(".prompt-indicator");

    block.html(function () {
      return $templateCache.get("shared/prompt-saved-indicator.html");
    });

    $timeout(function () {
      block.addClass('fadeOut');
    }, 4000);

    $timeout(function () {
      block.remove();
    }, 6000);
  };

  // prompt with exclamation icon.
  this.failed = function () {
    var block = $(".prompt-indicator");

    block.html(function () {
      return $templateCache.get("shared/prompt-failed-indicator.html");
    });

    $timeout(function () {
      block.addClass("fadeOut");
    }, 4000);

    $timeout(function () {
      block.remove();
    }, 6000);
  };

});