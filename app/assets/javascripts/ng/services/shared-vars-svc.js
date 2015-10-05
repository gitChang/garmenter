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
    invoice_number: '0001', garment_barcodes: { 1: '594832', 2: '897654' }
  }];

  // holds the history of the last collection
  this.historyInvoiceCollection = [];
});