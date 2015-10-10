'use strict';

App.controller('SignupCtrl', function ($scope, $state, $templateCache, $compile, HelperSvc) {

  //--
  // variables
  //--
  var $hs = HelperSvc;

  /**
  $scope.model = {
    company_name: null,
    branch_name: null,
    contact_person_first_name: null,
    contact_person_last_name: null,
    contact_person_mobile: null,
    contact_person_email: null,
    account_name: null,
    password: null,
    password_confirmation: null
  };
  **/

  $scope.model = {
    company_name: 'Clean Master',
    branch_name: 'West Branch',
    contact_person_first_name: 'Luke',
    contact_person_last_name: 'Lui',
    contact_person_mobile: '09265415953',
    contact_person_email: 'luke_lui@gmail.com',
    account_name: 'clean_master_wb',
    password: 'com_password',
    password_confirmation: 'com_password'
  };


  //--
  // functions
  //--
  $scope.assignAcctDataClass = function () {
    $('input').addClass('acct-data');
    // recompile to bind
    $compile($('#signup-form'))($scope);
  }

  $scope.pointInvalid = function (field, msg) {
    // invalid field pointer
    var attrModel = 'input[ng-model="model.' + field + '"]';
    var elemInvalid = $(attrModel);
    var elemParent = elemInvalid.parent('.form-group');
    var iconTpl = 'signup-tpls/icon-error-pointer-tpl.html';

    // reset style field has error
    $('.form-group.has-error').removeClass('has-error');
    $('span.icon-pointer').remove();
    $('h4.has-error-field').removeClass('has-error-field');

    // remove notification
    $hs.removeNotify();

    // apply error style
    elemParent.addClass('has-error'); // class="form-group has-error"
    elemParent.append($templateCache.get(iconTpl));
    elemParent.prev('h4').addClass('has-error-field'); // colorize red <h4>
    elemInvalid.focus();
    elemInvalid.select();

    // display message / notify
    $hs.notify(msg);
  }


  //--
  // events
  //--
  //setTimeout(function () {
  //  $scope.assignAcctDataClass();
  //}, 500)

  setTimeout(function () {
    $('input:first').focus();
  }, 500)

  // test error display
  //setTimeout(function () { $scope.pointInvalid('company_name'); }, 2000)
  //setTimeout(function () { $scope.pointInvalid('branch_name'); }, 6000)
})