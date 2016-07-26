angular.module('formioApp').constant('AppConfig', {
{% if domain %}
  appUrl: '{{ domain }}',
  apiUrl: '{{ domain }}',
{% else %}
  appUrl: '{{ protocol }}://{{ path }}.{{ host }}',
  apiUrl: '{{ protocol }}://api.{{ host }}',
{% endif %}
  forms: {
    userLoginForm: APP_URL + '/user/login'
  },
  resources: {
    user: {
      form: APP_URL + '/user',
        resource: 'UserResource'
    }
  }
});
