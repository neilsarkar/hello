angular.module('recs').controller('RecsControl', [
  '$scope', '$adRec',
  function($scope, $adRec) {
    $adRec.all().then(function yes(recs) {
      $scope.recs = recs
    }, function no(xhr) {
      console.error("Nope", xhr)
    })
  }
])
