angular.module('app').config([
  '$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/recs')

    $stateProvider.
      state('admin', {
        url: '/',
        templateUrl: 'templates/layout.html',
        abstract: true
      }).
      state('admin.recs', {
        url: 'recs',
        templateUrl: 'templates/recs/layout.html',
        abstract: true
      }).
      state('admin.recs.list', {
        url: '',
        templateUrl: 'templates/recs/index.html',
        controller: 'RecsControl',
        authReq: true
      }).
      state('admin.recs.new', {
        url: 'recs/new',
        templateUrl: 'templates/recs/form.html',
        controller: 'NewRecControl',
        authReq: true
      })
  }
])
