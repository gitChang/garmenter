'use strict';

App.service('SharedFnSvc', function (SharedVarsSvc) {

  this.resetSharedVarsForEditInvoice = function () {
    SharedVarsSvc.currentInvoiceNumber = null;
    SharedVarsSvc.currentGarmentBarcodesLen = null;
  }

})