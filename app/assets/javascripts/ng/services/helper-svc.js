'use strict';

App.service('HelperSvc', function ($templateCache, $cookies, GlobalDataSvc) {

  // this
  var self = this;


  //--
  // methods
  //--

  this.getAuthToken = function () {
    return { authenticity_token: $cookies.get('xsrf_token') }
  }


  this.injectAuthToken = function (model) {
    return $.extend(model, self.getAuthToken());
  }


  this.setInvoiceNumber = function (number) {
    // set invoice
    GlobalDataSvc.currentInvoiceNumber = number.toUpperCase();
  }


  this.clearInvoiceNumber = function () {
    // clear invoice
    GlobalDataSvc.currentInvoiceNumber = null;
  }


  this.clearCookieBarcode = function () {
    $cookies.remove('barcode');
    console.log('cookie barcode: ', $cookies.get('barcode'));
  };


  this.getInvoiceNumber = function () {
    return GlobalDataSvc.currentInvoiceNumber;
  }


  this.getRecentInvoiceCollection = function () {
    return GlobalDataSvc.recentInvoiceCollection;
  }


  this.getHistoryInvoiceCollection = function () {
    return GlobalDataSvc.historyInvoiceCollection;
  }


  this.getSizeRecentInvoiceCollection = function () {
    return GlobalDataSvc.recentInvoiceCollection.length;
  }


  this.getSizeHistoryInvoiceCollection = function () {
    return GlobalDataSvc.historyInvoiceCollection.length;
  }


  this.getSizeGarmentCollection = function () {
    var size;

    GlobalDataSvc.recentInvoiceCollection
    .forEach(function (item, index, object) {
      // compare
      if (item.invoice_number === GlobalDataSvc.currentInvoiceNumber)
        size = item.garment_barcodes.length;
    })

    return size;
  }


  this.setHistory = function () {
    // pass the recent invoice collection to history
    GlobalDataSvc.historyInvoiceCollection = GlobalDataSvc.recentInvoiceCollection;
    // and clear the value.
    GlobalDataSvc.recentInvoiceCollection  = [];

    return true;
  }


  this.deleteInvoiceGarment = function (invoiceNumber, garmentNumber) {
    // signal
    var affirm = false;

    // loop thru invoice
    GlobalDataSvc.recentInvoiceCollection
    .forEach(function (invoice, nindex, nobject) {
      // compare invoice
      if (invoice.invoice_number === invoiceNumber.toUpperCase()) {
        // loop thru garments
        invoice.garment_barcodes
        .forEach(function (garment, gindex, gobject) {
          // compare garment
          if (garment === garmentNumber.toUpperCase()) {
            gobject.splice(gindex, 1);
            affirm = true;
          }
        })
      }
    })

    return affirm;
  }


  this.findInvoiceRecentCollection = function () {
    // signal
    var found = false;

    // loop thru recent invoice collection and
    // find invoice number
    GlobalDataSvc.recentInvoiceCollection
    .forEach(function (invoice, index, object) {
      if (invoice.invoice_number === self.getInvoiceNumber())
        found = true;
    })

    // log
    console.log('invoice ', self.getInvoiceNumber(), ' is in collection ', found);

    return found;
  }


  this.saveInvoice = function (object) {
    // signal either saved or updated
    var update = false;

    // verify if update
    if (self.findInvoiceRecentCollection()) {
      // then perform update
      if (self.updateGarmentCollection(object.garment_barcodes))
        update = true;

    } else {
      // this is new invoice
      // push to recent collection invoice
      if (self.addGarmentCollection(object))
        update = false
    }

    return update;
  }


  this.addGarmentCollection = function (object) {
    // save invoice to collection
    GlobalDataSvc.recentInvoiceCollection.push(object);
    return true;
  }


  this.updateGarmentCollection = function (array) {
    // loop thru and find existing invoice
    GlobalDataSvc.recentInvoiceCollection.forEach(function (invoice, nindex, nobject) {
      // compare
      if (invoice.invoice_number === self.getInvoiceNumber()) {
        // get each and push
        array.forEach(function (garment, gindex, gobject) {
          invoice.garment_barcodes.push(garment);
        })
      }
    })

    return true;
  }


  this.notify = function (msg) {
    var tplPath = 'shared-tpls/duplicate-msg-tpl.html';
    var notifyCenter = jQuery('#notif-center')
                       .html($templateCache.get(tplPath));

    // place msg and display warning
    notifyCenter.find('.msg').text(msg);
    notifyCenter.removeClass('hidden');
  }


  this.removeNotify = function () {
    var tplPath = 'shared-tpls/duplicate-msg-tpl.html';
    var notifyCenter = jQuery('#notif-center')
                       .html($templateCache.get(tplPath));

    // hide and remove warning
    notifyCenter.addClass('hidden');
    notifyCenter.find('.msg').text('');
  }


  this.findBarcodeDuplicate = function (number, arrayLocal) {
    // signal
    var found = false;

    // compare unsaved current invoice number first
    if (number === GlobalDataSvc.currentInvoiceNumber) found = true;

    // array local is the array from the ctrl, inspect it also.
    arrayLocal.forEach(function (item, index, object) {
      if (item === number) found = true;
    })

    // loop thru and find duplicate
    GlobalDataSvc.recentInvoiceCollection
    .forEach(function (invoice, nindex, nobject) {
      // compare to invoices
      if (invoice.invoice_number === number.toUpperCase()) found = true;
      // compare to garments
      invoice.garment_barcodes.forEach(function (garment, gindex, gobject) {
        if (garment === number.toUpperCase()) found = true;
      })
    })

    // notify user
    if (found) this.notify('barcode already exists!');
    else this.removeNotify();

    // log
    console.log('duplicate barcode ', found);

    return found;
  }


  this.scannerSpecialCharFound = function (number) {
    var charSignal = '*';
    var tempNumber = number.replace(/(\r\n|\n|\r)/gm, charSignal);

    // check char
    if (tempNumber.indexOf(charSignal) === -1) return false;

    // default true
    return true;
  }


  this.inspectEmpty = function (object) {
    var key;

    for (var k in object) {
      if (!object[k] || object[k].trim().length === 0) {
        key = k;
        break;
      }
    }

    return key;
  }


  this.originalHtml; // cache the original html content of element requesting

  this.indicateProcessing = function (element) {
    var tpl = $templateCache.get('shared-tpls/processing-tpl.html');

    // cache original template for late reset
    self.originalHtml = jQuery(element).html();

    jQuery(element).html(tpl);

    return true;
  }


  this.stopIndicateProcessing = function (element) {
    // reset element html
    jQuery(element).html(self.originalHtml);
    return true;
  }

})