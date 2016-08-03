(function() {
  'use strict';
  angular
    .module('formioApp')
    .config([
      'formioComponentsProvider',
      function (formioComponentsProvider) {
        formioComponentsProvider.register('icons', {
          title: 'Icons',
          template: 'formio/components/icons.html',
          controller: ['$scope', function($scope) {
            $scope.setValue = function(value) {
              $scope.data[$scope.component.key] = value;
            };
          }],
          group: 'custom',
          icon: 'fa fa-smile-o',
          settings: {
            input: true,
            icons: [
              {
                value: 5,
                icon: 'fa fa-thumbs-o-up'
              },
              {
                value: 4,
                icon: 'fa fa-smile-o'
              },
              {
                value: 3,
                icon: 'fa fa-meh-o'
              },
              {
                value: 2,
                icon: 'fa fa-frown-o'
              },
              {
                value: 1,
                icon: 'fa fa-thumbs-o-down'
              },
            ],
            fontSize: '2em',
            activeColor: 'green',
            multiple: false,
            protected: false,
            persistent: true,
            tableView: false
          },
          views: [
            {
              name: 'Display',
              template: 'formio/components/icons/display.html'
            },
            {
              name: 'Validation',
              template: 'formio/components/icons/validate.html'
            },
            {
              name: 'API',
              template: 'formio/components/common/api.html'
            },
            {
              name: 'Layout',
              template: 'formio/components/common/layout.html'
            },
            {
              name: 'Conditional',
              template: 'formio/components/common/conditional.html'
            }
          ]
        });
      }
    ])
    .run([
      '$templateCache',
      'FormioUtils',
      function ($templateCache, FormioUtils) {
        $templateCache.put('formio/components/icons.html', FormioUtils.fieldWrap('<i ng-repeat="icon in component.icons" ng-style="{ color: (data[component.key] == icon.value ? component.activeColor : \'\'), \'font-size\': component.fontSize }" ng-click="setValue(icon.value)" class="{{icon.icon}}" aria-hidden="true"></i>'));
        $templateCache.put('formio/components/icons/display.html', '' +
          '<ng-form>' +
          '  <form-builder-option property="label"></form-builder-option>' +
          '  <value-builder data="component.icons" label-label="Icon" label-property="icon"></value-builder>' +
          '  <form-builder-option property="fontSize" label="Font Size"></form-builder-option>' +
          '  <form-builder-option property="activeColor" label="Active Color"></form-builder-option>' +
          '  <form-builder-option property="customClass"></form-builder-option>' +
          '  <form-builder-option property="protected"></form-builder-option>' +
          '  <form-builder-option property="persistent"></form-builder-option>' +
          '  <form-builder-option property="tableView"></form-builder-option>' +
          '</ng-form>');
        $templateCache.put('formio/components/icons/validate.html',
          '<ng-form>' +
          '<form-builder-option property="validate.required"></form-builder-option>' +
          '</ng-form>'
        );
      }
    ]);
})();
