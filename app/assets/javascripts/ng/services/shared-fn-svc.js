'use strict';

App.service('SharedFnSvc', function ($templateCache, SharedVarsSvc) {

  this.resetSharedVarsForEditInvoice = function () {
    SharedVarsSvc.currentInvoiceIndex = null;
    SharedVarsSvc.currentInvoiceNumber = null;
  }


  this.setTargetInvoice = function (invoiceIndex) {
    SharedVarsSvc.currentInvoiceIndex = invoiceIndex;
    SharedVarsSvc.currentInvoiceNumber = SharedVarsSvc
      .recentInvoiceCollection[invoiceIndex]
      .invoice_number;
  }


  this.findInObjectArray = function (objectArray, value, notifCenter) {
    var found = false;

    objectArray.forEach(function (item, index, object) {
      if ( item.invoice_number.toLowerCase() === value.toLowerCase() ) found = true;
    })

    if ( found ) {
      if (notifCenter.length) {
        notifCenter.html(function () {
          return $templateCache.get('shared-tpls/duplicate-msg-tpl.html');
        })
        notifCenter.removeClass('hidden');
      }
    }

    return found;
  }


  this.findInObject = function (object, value, notifCenter) {
    var found = false;

    for (var key in object) {
      if ( object[key] === value ) found = true;
    }

    if ( found ) {
      if (notifCenter.length) {
        notifCenter.html(function () {
          return $templateCache.get('shared-tpls/duplicate-msg-tpl.html');
        })
        notifCenter.removeClass('hidden');
      }
    }

    return found;
  }


  this.getLastKey = function (object) {
    var lastKey;

    for (var key in object) {
      lastKey = parseInt( key );
    }
    return lastKey || 0;
  }


  this.removeNotification = function ( notifCenter ) {
    //if ( notifCenter.hasClass('hidden') ) return;
    notifCenter.html('').addClass('hidden');
  }


  this.reOrderKeys = function ( object, keyStart ) {
    var tempObject = object;
    var i = keyStart || 1; // base to one.

    // pass the value of old key to the new key
    for ( var key in tempObject ) {

      // when the key is already matches
      // the ordering, proceed to next key
      if ( key != i) {

        Object.defineProperty( tempObject, i,
          Object.getOwnPropertyDescriptor( tempObject, key ) );

        // delete old key and value
        delete tempObject[ key ];
      }

      i++;
    }

    return tempObject;
  }

})