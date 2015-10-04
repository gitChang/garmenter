'use strict';

App.service('SharedSvc', function () {

  // use in new garment barcode scan
  this.currentInvoiceNumber = null;

  // holds the number of target garment collection for modification (add)
  this.currentGarmentBarcodesLen = null;

  // holds the recent saved invoice scanned
  this.recentInvoiceCollection = [{
    invoice_number: '3242',
    garment_barcodes: {
      1: '234',
      2: '45676324',
      3: '4534423',
      4: '879576'
    }
  }];

  // holds the history of the last collection
  this.historyInvoiceCollection = [];
});