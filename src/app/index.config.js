(function() {
  'use strict';
  angular
    .module('formioApp')
    .config([
      'AppConfig',
      'FormioProvider',
      'FormioAuthProvider',
      function(
        AppConfig,
        FormioProvider,
        FormioAuthProvider
      ) {
        FormioProvider.setAppUrl(AppConfig.appUrl);
        FormioProvider.setBaseUrl(AppConfig.apiUrl);
        FormioAuthProvider.setForceAuth(true);
        FormioAuthProvider.setStates('auth.login', 'home');
        FormioAuthProvider.register('login', 'user', 'login');
      }
    ]);
})();
