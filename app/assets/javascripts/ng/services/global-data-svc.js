'use strict';

App.service('GlobalDataSvc', function () {

  // use in new or update invoice
  this.currentInvoiceNumber = null;


  // holds the recent saved invoice scanned
  this.recentInvoiceCollection = [{
    invoice_number: 'B6843024J5',
    garment_barcodes: [ 'L16BC7890', 'A41234588' ]
  }];


  // holds the history of the last collection
  this.historyInvoiceCollection = [];
});