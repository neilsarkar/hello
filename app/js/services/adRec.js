angular.module('recs').service('$adRec', [
  '$http',
  function($http) {
    var self = this,
        API_BASE_URL = '/api';

    self.create = function(rec) {
      return $http({
        method: 'POST',
        url: API_BASE_URL + '/recs',
        data: rec
      }).then(function(response) {
        return response.data
      })
    }

    self.update = function(rec) {
    }

    self.delete = function(rec) {

    }
  }
])
