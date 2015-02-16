angular.module('recs').service('$adRec', [
  '$http',
  function($http) {
    var self = this;

    self.all = function() {
      return $http({
        method: 'GET',
        url: Const.API_BASE_URL + '/recs'
      }).then(function(response) {
        return response.data.recs
      })
    }

    self.get = function(uuid) {
      return $http({
        method: 'GET',
        url: Const.API_BASE_URL + '/recs/' + uuid
      }).then(function(response) {
        return response.data
      })
    }

    self.create = function(rec) {
      return $http({
        method: 'POST',
        url: Const.API_BASE_URL + '/recs',
        data: rec
      }).then(function(response) {
        return response.data
      })
    }

    self.update = function(rec) {
      return $http({
        method: 'PATCH',
        url: Const.API_BASE_URL + '/recs/' + rec.uuid,
        data: rec
      }).then(function(response) {
        return response.data
      })
    }

    self.delete = function(uuid) {
      return $http({
        method: 'DELETE',
        url: Const.API_BASE_URL + '/recs/' + uuid
      })
    }
  }
])
