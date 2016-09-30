(function() {
  'use strict';
  angular.module('formioApp')
    .provider('UserResource', function() {
      return {
        $get: function() { return null; },
        base: 'users.'
      };
    });
})();
