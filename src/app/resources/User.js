(function() {
  'use strict';

  /**
   *  The following shows an example resource provider.
   *
   *  This allows you to hook into the CRUD operations for a single Form.io
   *  resource as it is being indexed, viewed, deleted, created, updated, etc. By
   *  providing your logic here, you can control how Form.io behaves within your
   *  application.
   */
  angular.module('formioApp')
    .provider('UserResource', function() {
      return {
        $get: function() { return null; },
        base: 'users.'
      };
    });
})();
