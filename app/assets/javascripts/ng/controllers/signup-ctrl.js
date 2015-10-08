'use strict';

App.controller( 'SignupCtrl', function ( $scope, $state, $templateCache, $compile ) {

  // model
  $scope.model = {
    company_name: null,
    branch_name: null,
    contact_person_name: null,
    contact_person_mobile: null,
    contact_person_email: null,
    account_name: null,
    password: null,
    confirm_password: null
  };


  // apply class .acct-data to all <input>
  $scope.assignAcctDataClass = function () {
    // = input.acct-data
    jQuery( 'input' ).addClass( 'acct-data' );
    // recompile for directives to function
    $compile( jQuery('#signup-form') )( $scope );
    // report
    console.log( 'applied class acct-data.' )
  }


  // invalid field pointer
  $scope.pointInvalid = function ( err ) {
    // element the contains invalida data
    var attrModel = 'input[ng-model="model.' + err + '"]';
    var elemInvalid = jQuery( attrModel );
    var elemParent = elemInvalid.parent( '.form-group' );
    var iconTpl = 'signup-tpls/icon-error-pointer-tpl.html';


    // reset fields has error style
    jQuery( '.form-group.has-error' ).removeClass( 'has-error' );
    jQuery( 'span.icon-pointer' ).remove();
    jQuery( 'h4.has-error-field' ).removeClass( 'has-error-field' );

    setTimeout(
    function () {
      // class="form-group has-error"
      elemParent.addClass( 'has-error' );

      // insert <i class="fa fa-ban fa-sm"><i>
      elemParent.append( $templateCache.get( iconTpl ) );

      // colorize red <h4>
      elemParent.prev( 'h4' ).addClass( 'has-error-field' );

      // focus
      elemInvalid.select();
    },
    1000)
  }

  // place acct-data class
  setTimeout( function () { $scope.assignAcctDataClass(); }, 500 )

  // focus to first <input>
  setTimeout( function () { jQuery('input:first').focus(); }, 500 )

  // test error display
  //setTimeout( function () { $scope.pointInvalid( 'company_name' ); }, 2000 )
  //setTimeout( function () { $scope.pointInvalid( 'branch_name' ); }, 6000 )
})