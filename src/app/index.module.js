(function() {
  'use strict';
  angular
    .module('formioApp', [
      'ngSanitize',
      'ui.router',
      'ui.bootstrap',
      'ui.bootstrap.accordion',
      'ui.bootstrap.alert',
      'formio',
      'ngFormioHelper',
      'ngFormBuilder',
      'ngFormBuilderHelper'
    ]);
})();
