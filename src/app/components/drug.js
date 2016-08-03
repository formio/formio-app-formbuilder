(function() {
  'use strict';
  angular
    .module('formioApp')
    .config([
      'formioComponentsProvider',
      function (formioComponentsProvider) {
        formioComponentsProvider.register('drug', {
          title: 'FDA Drug',
          template: 'formio/components/select.html',
          controller: ['$scope', '$http', 'Formio', '$interpolate', function($scope, $http, Formio, $interpolate) {
            var settings = $scope.component;
            var options = {cache: true};
            $scope.nowrap = true;
            $scope.hasNextPage = false;
            $scope.selectItems = [];
            var valueProp = $scope.component.valueProperty;
            $scope.getSelectItem = function(item) {
              if (!item) {
                return '';
              }
              //if (settings.dataSrc === 'values') {
              //  return item.value;
              //}

              // Allow dot notation in the value property.
              if (valueProp.indexOf('.') !== -1) {
                var parts = valueProp.split('.');
                var prop = item;
                for (var i in parts) {
                  prop = prop[parts[i]];
                }
                return prop;
              }

              return valueProp ? item[valueProp] : item;
            };

            if (settings.multiple) {
              settings.defaultValue = [];
            }

            $scope.refreshItems = angular.noop;
            $scope.$on('refreshList', function(event, url, input) {
              $scope.refreshItems(input, url);
            });

            // Add a watch if they wish to refresh on selection of another field.
            if (settings.refreshOn) {
              $scope.$watch('data.' + settings.refreshOn, function() {
                $scope.refreshItems();
              });
            }

            switch (settings.dataSrc) {
              //case 'values':
              //  $scope.selectItems = settings.data.values;
              //  break;
              //case 'json':
              //  try {
              //    $scope.selectItems = angular.fromJson(settings.data.json);
              //  }
              //  catch (error) {
              //    $scope.selectItems = [];
              //  }
              //  break;
              case 'url':
              case 'resource':
                var url = '';
                //if (settings.dataSrc === 'url') {
                  url = settings.data.url;
                  if (url.substr(0, 1) === '/') {
                    url = Formio.getBaseUrl() + settings.data.url;
                  }

                  // Disable auth for outgoing requests.
                  if (!settings.authenticate && url.indexOf(Formio.getBaseUrl()) === -1) {
                    options = {
                      disableJWT: true,
                      headers: {
                        Authorization: undefined,
                        Pragma: undefined,
                        'Cache-Control': undefined
                      }
                    };
                  }
                //}
                //else {
                //  url = Formio.getBaseUrl();
                //  if (settings.data.project) {
                //    url += '/project/' + settings.data.project;
                //  }
                //  url += '/form/' + settings.data.resource + '/submission';
                //}

                options.params = {
                  limit: 10,
                  skip: 0
                };

                $scope.loadMoreItems = function($select, $event) {
                  $event.stopPropagation();
                  $event.preventDefault();
                  options.params.skip += options.params.limit;
                  $scope.refreshItems(null, null, true);
                };

                if (url) {
                  $scope.selectLoading = false;
                  $scope.hasNextPage = true;
                  $scope.refreshItems = function(input, newUrl, append) {
                    newUrl = newUrl || url;
                    if (!newUrl) {
                      return;
                    }

                    // Do not want to call if it is already loading.
                    if ($scope.selectLoading) {
                      return;
                    }

                    // If this is a search, then add that to the filter.
                    if (settings.searchField && input) {
                      newUrl += ((newUrl.indexOf('?') === -1) ? '?' : '&') +
                        encodeURIComponent(settings.searchField) +
                        '=' +
                        encodeURIComponent(input);
                    }

                    // Add the other filter.
                    if (settings.filter) {
                      var filter = $interpolate(settings.filter)({data: $scope.data});
                      newUrl += ((newUrl.indexOf('?') === -1) ? '?' : '&') + filter;
                    }

                    // Set the new result.
                    var setResult = function(data) {
                      if (data.length < options.params.limit) {
                        $scope.hasNextPage = false;
                      }
                      if (append) {
                        $scope.selectItems = $scope.selectItems.concat(data);
                      }
                      else {
                        $scope.selectItems = data;
                      }
                    };

                    $scope.selectLoading = true;
                    $http.get(newUrl, options).then(function(result) {
                      var data = result.data;
                      if (data) {
                        setResult(data.results);
                      }
                    })['finally'](function() {
                      $scope.selectLoading = false;
                    });
                  };
                  $scope.refreshItems();
                }
                break;
              default:
                $scope.selectItems = [];
            }
          }],
          group: 'custom',
          icon: 'fa fa-medkit',
          settings: {
            input: true,
            tableView: false,
            label: '',
            key: 'drugField',
            placeholder: '',
            dataSrc: 'url',
            data: {
              url: 'https://api.fda.gov/drug/label.json'
            },
            searchField: 'search',
            fdaKey: '',
            valueProperty: '',
            defaultValue: '',
            refreshOn: '',
            filter: '',
            authenticate: false,
            template: '<span>{{ item.openfda.brand_name[0] }}</span>',
            multiple: false,
            protected: false,
            unique: false,
            persistent: true,
            validate: {
              required: false
            }
          },
          views: [
            {
              name: 'Display',
              template: 'formio/components/drug/display.html'
            },
            {
              name: 'Validation',
              template: 'formio/components/drug/validate.html'
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
      function ($templateCache) {
        $templateCache.put('formio/components/drug/display.html', '' +
          '<ng-form>' +
          '  <form-builder-option property="label"></form-builder-option>' +
          '  <form-builder-option property="placeholder"></form-builder-option>' +
          '  <form-builder-option property="customClass"></form-builder-option>' +
          '  <form-builder-option property="tabindex"></form-builder-option>' +
          '  <form-builder-option property="multiple"></form-builder-option>' +
          '  <form-builder-option property="protected"></form-builder-option>' +
          '  <form-builder-option property="persistent"></form-builder-option>' +
          '  <form-builder-option property="tableView"></form-builder-option>' +
          '</ng-form>');
        $templateCache.put('formio/components/drug/validate.html',
          '<ng-form>' +
          '<form-builder-option property="validate.required"></form-builder-option>' +
          '</ng-form>'
        );
      }
    ]);
})();
