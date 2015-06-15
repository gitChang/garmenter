"use strict";

App.directive("dropdown", function () {

  function Link(scope, element) {
    
    element.bind("click", function () {
      var menu = element.parent().find("div.dropdown-menue");
      var menu_list_len = menu.find("li").length;

      /**
      * disable custom widget when saving.
      **/
      if (scope.is_processing) return;
      
      if (menu_list_len) menu.removeClass("hidden");
    });
  }

  return {
    restrict : "C",
    link : Link
  };
});