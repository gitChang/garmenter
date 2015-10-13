'use strict';

App.directive('initScan', function ($compile, HelperSvc) {

  function linker (scope, element) {

    //--
    // variables
    //--
    var $hs = HelperSvc;
    var $host = $(location).attr('host');
    var $ZXingURL;


    //--
    // methods
    //--

    function setZXingURL() {
      if( /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
        $ZXingURL = 'zxing://scan/?ret=http%3A%2F%2F' +  encodeURI($host) + '%2Fscan-result%2F%7BCODE%7D';
      } else {
        $hs.notify('You device is incompatible. Instead, use external barcode scanner.');
        return false
      }

      return true;
    }


    //--
    // callbacks
    //--
    function callbackClick () {
      // when not using android
      // or ios, ignore.
      if (!setZXingURL()) return;

      var popwin = window.open($ZXingURL, '_blank');

      popwin.document.write('Initializing Scanner...');

      setTimeout(function() {
        close();
      }, 2000)
    }


    //--
    // events
    //--
    element.on('click', callbackClick);

  }


  return {
    restrict: 'C',
    link: linker
  };
})