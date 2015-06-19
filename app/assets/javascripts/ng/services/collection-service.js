"use strict";

App.service("CollectionService", CollectionService);

function CollectionService(DisciplinesResource, ClassCodesResource) {

  var disciplines = [];
  var class_codes = {};

  
  this.get_disciplines = function () { 
    disciplines = DisciplinesResource.query();
    return disciplines;
  };
  
  this.get_class_codes = function (discipline) {
    class_codes = ClassCodesResource.query({ discipline: discipline });
    return class_codes;
  };

  this.set_class_code = function (discipline, new_class_code) {
    ClassCodesResource.save({ 
      discipline: discipline, 
      new_class_code: class_code 
    })
    .$promise.then(
      function () {
        class_codes[discipline].length ? 
        class_codes[discipline].push(class_code) : 
        class_codes[discipline] = [class_code];
      }, 
      function () {
        alert("error class code new.");
      });
  };

}