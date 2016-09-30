(function() {
  'use strict';
  angular
    .module('formioApp')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig(
    $stateProvider,
    $urlRouterProvider,
    $injector,
    AppConfig,
    FormioResourceProvider,
    FormioFormsProvider,
    FormioFormBuilderProvider,
    FormIndexController
  ) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: FormIndexController
      })
      .state('users', {
        abstract: true,
        url: '/users',
        templateUrl: 'views/users.html'
      });

    // Register all of the resources.
    angular.forEach(AppConfig.resources, function(resource, name) {
      FormioResourceProvider.register(name, resource.form, $injector.get(resource.resource + 'Provider'));
    });

    FormioFormsProvider.register('userform', AppConfig.appUrl, {});
    FormioFormBuilderProvider.register('', AppConfig.appUrl, {});

    // Register the form routes.
    $urlRouterProvider.otherwise('/');
  }

})();
