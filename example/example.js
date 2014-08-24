(function(Backbone, angular) {
  'use strict';

  Backbone.$ = angular.element; // This is only required because this example doesn't use jQuery

  angular.module('app', [])
    .controller('ExampleCtrl', function($scope) {
      $scope.content = 'Hello World!';
    });

  var view = new Backbone.NgView({
    templateUrl: 'example.html',
    controller: 'ExampleCtrl'
  });

  document.getElementById('example').appendChild(view.render().el);
})(Backbone, angular);