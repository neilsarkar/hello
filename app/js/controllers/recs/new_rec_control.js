angular.module('recs').controller('NewRecControl', [
  '$scope', '$adRec', '$state',
  function($scope, $adRec, $state) {
    $scope.rec = {}

    $scope.save = function() {
      $adRec.create($scope.rec).then(function yes() {
        $state.go('admin.recs.list')
        alert('Created.')
      }, function no(xhr) {
        console.error("Nope.")
      })
    }
  }
])
