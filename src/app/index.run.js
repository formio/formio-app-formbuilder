(function() {
  'use strict';
  angular
    .module('formioApp')
    .run([
      '$rootScope',
      'AppConfig',
      'FormioAuth',
      function(
        $rootScope,
        AppConfig,
        FormioAuth
      ) {
        // Initialize authentication.
        FormioAuth.init();

        // Add the forms to the root scope.
        angular.forEach(AppConfig.forms, function(url, form) {
          $rootScope[form] = url;
        });
      }
    ]);
})();
