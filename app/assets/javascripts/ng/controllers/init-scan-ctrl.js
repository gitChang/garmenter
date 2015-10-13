'use strict';

App.controller('InitScanCtrl', function($state, $window, HelperSvc) {

  // variables
  //--
  var $hs = HelperSvc;
  var $host = $(location).attr('host');
  var $ZXingURL = 'zxing://scan/?ret=http%3A%2F%2F' +  encodeURI($host) + '%2Fscan-result%2F%7BCODE%7D';

  setTimeout(function() {
    $window.location.replace($ZXingURL);
  }, 1000)

  //--
  // methods
  //--

  //--
  // events
  //--

  // when not using android
  // or ios, ignore.
  //if (!setZXingURL()) return;

  //if( /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ) {

  //} else {
  //  $hs.notify('You device is incompatible. Instead, use external barcode scanner.');
  //}

})
