angular.module('recs').controller('NewRecControl', [
  '$scope', '$adRec',
  function($scope, $adRec) {
    $scope.rec = {}

    $scope.save = function() {
      $adRec.create($scope.rec).then(function yes() {
        console.log("Did it")
      }, function no(xhr) {
        console.error("Nope.")
      })
    }
  }
])
