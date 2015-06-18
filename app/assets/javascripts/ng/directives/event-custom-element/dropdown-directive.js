"use strict";

App.directive("dropdown", function ($rootScope) {

  function Link(scope, element) {
    
    element.bind("click", function () {
      var menu = element.parent().find("div.dropdown-menue");
      var menu_list_len = menu.find("li").length;

      /**
      * disable custom widget when saving.
      **/
      if ($rootScope.is_processing) return;

      /**
      * reset custom dropdown visibility.
      **/
      angular.element(".dropdown-menue").addClass("hidden");
      
      /**
      * show selected dropdown.
      **/
      if (menu_list_len) menu.removeClass("hidden");
    });
  }

  return {
    restrict : "C",
    link : Link
  };
});