angular.module('recs').controller('EditRecControl', [
  '$scope', '$adRec', '$stateParams', '$state',
  function($scope, $adRec, $stateParams, $state) {
    $adRec.get($stateParams.uuid).then(function(rec) {
      $scope.rec = rec
    })

    $scope.save = function() {
      $adRec.update($scope.rec).then(function yes() {
        alert('Saved.')
      }, function no(xhr) {
        console.error("Nope.", xhr)
      })
    }

    $scope.delete = function() {
      if( !window.confirm('Are you sure?') ) { return; }
      $adRec.delete($scope.rec.uuid).then(function yes() {
        $state.go('admin.recs.list')
      }, function no(xhr) {
        console.error("Nope.", xhr)
      })
    }
  }
])
