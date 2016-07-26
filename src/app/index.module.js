(function() {
  'use strict';
  angular
    .module('formioApp', [
      'ngSanitize',
      'ui.router',
      'ui.bootstrap',
      'ui.bootstrap.accordion',
      'ui.bootstrap.alert',
      'ngFormioHelper',
      'ngFormBuilder',
      'bgf.paginateAnything',
      'formio',
      'ngMap'
    ]);
})();
