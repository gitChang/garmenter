'use strict';

App.factory('ErrorDisplayFactory', ErrorDisplayFactory);

function ErrorDisplayFactory() {

  var base_selector = null;
  var err_container = '<div class="alert alert-warning text-center">';

  var instance = {
    set_base_selector: function (bs) {
      base_selector = bs + ' .form-group.' // form-name.form-group.yada
    },
    clear_errors: function () {
      $('form .alert').remove();
    },
    render: function (res) {
      var selector = Object.keys(res.data);
      instance.clear_errors();

      $(base_selector + selector + ':first').prepend(err_container);
      $(base_selector + selector + ' .alert:first').append(res.data[selector]);
    }
  };

  return instance;
}