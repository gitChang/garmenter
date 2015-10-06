'use strict';

App.service('SharedVarsSvc', function () {

  // use in new or update invoice
  this.currentInvoiceNumber = null;

  // used as the signal of editing
  // existing invoice
  this.currentInvoiceIndex = null;

  // holds the number of target garment collection for modification (add)
  this.currentGarmentBarcodesLen = null;

  // holds the recent saved invoice scanned
  this.recentInvoiceCollection = [{
    invoice_number: 'B6843024J5', garment_barcodes: { 1: 'L16BC7890', 2: 'A41234588' }
  }];

  // holds the history of the last collection
  this.historyInvoiceCollection = [];
});