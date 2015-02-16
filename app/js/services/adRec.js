angular.module('recs').service('$adRec', [
  '$http',
  function($http) {
    var self = this;

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
    }

    self.delete = function(rec) {

    }
  }
])
