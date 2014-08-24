/* global describe, it, expect, beforeEach */
(function(NgView) {
  'use strict';

  Backbone.$ = angular.element;

  angular.module('app', []);
  angular.bootstrap(document, ['app']);

  function render(view, callback, success) {
    var evt = success !== false ? 'ng:render:success' : 'ng:render:error';

    view.listenTo(view, evt, function() {
      setTimeout(callback, 0);
    });

    view.render();
  }

  describe('Backbone.NgView', function() {
    var view;
    
    beforeEach(function(done) {
      view = new NgView();

      render(view, done, true);
    });

    it('should emit ng:render:success on success', function(done) {
      done();
    });
  });

  describe('Backbone.NgView', function() {
    var view;

    beforeEach(function(done) {
      view = new NgView({
        resolve: {
          test: function() {
            var $q = angular.element(document).injector().get('$q');
            var deferred = $q.defer();

            setTimeout(function() {
              deferred.reject();
            }, 0);

            return deferred.promise;
          }
        }
      });

      render(view, done, false);
    });
    
    it('should emit ng:render:error on error', function(done) {
      done();
    });
  });

  describe('Backbone.NgView', function() {
    var view;
    
    beforeEach(function(done) {
      view = new NgView();

      render(view, done, true);
    });

    it('should compile when not provided any options', function(done) {
      expect(angular.element(view.el).scope()).toBeDefined();

      done();
    });
  });

  describe('Backbone.NgView', function() {
    var view;
    
    beforeEach(function(done) {
      view = new NgView({
        modules: ['app']
      });

      render(view, done, true);
    });

    it('should compile when provided modules', function(done) {
      expect(angular.element(view.el).scope()).toBeDefined();

      done();
    });
  });

  describe('Backbone.NgView', function() {
    var view;

    beforeEach(function(done) {
      view = new NgView({
        template: 'test'
      });

      render(view, done, true);
    });
    
    it('should compile when provided a template (string)', function(done) {
      expect(angular.element(view.el).text()).toBe('test');

      done();
    });
  });

  describe('Backbone.NgView', function() {
    var view;

    beforeEach(function(done) {
      view = new NgView({
        template: function() {
          return 'test';
        }
      });

      render(view, done, true);
    });
    
    it('should compile when provided a template (function)', function(done) {
      expect(angular.element(view.el).text()).toBe('test');

      done();
    });
  });

  describe('Backbone.NgView', function() {
    var view;

    beforeEach(function(done) {
      view = new NgView({
        template: function() {
          var $q = angular.element(document).injector().get('$q');
          var deferred = $q.defer();

          setTimeout(function() {
            deferred.resolve('test');
          }, 0);

          return deferred.promise;
        }
      });

      render(view, done, true);
    });
    
    it('should compile when provided a template (promise)', function(done) {
      expect(angular.element(view.el).text()).toBe('test');

      done();
    });
  });

  describe('Backbone.NgView', function() {
    var view;

    beforeEach(function(done) {
      view = new NgView({
        template: '{{content}}',
        controller: function($scope) {
          $scope.content = 'test';
        }
      });

      render(view, done, true);
    });
    
    it('should compile when provided a template and a controller', function(done) {
      expect(angular.element(view.el).text()).toBe('test');

      done();
    });
  });

  describe('Backbone.NgView', function() {
    var view;

    beforeEach(function(done) {
      view = new NgView({
        templateUrl: 'test.html'
      });

      angular.element(document).injector().get('$templateCache')
        .put('test.html', 'test');

      render(view, done, true);
    });
    
    it('should compile when provided a template file (URL)', function(done) {
      expect(angular.element(view.el).text()).toBe('test');

      done();
    });
  });

  describe('Backbone.NgView', function() {
    var view;

    beforeEach(function(done) {
      view = new NgView({
        templateUrl: function() {
          return 'test.html';
        }
      });

      angular.element(document).injector().get('$templateCache')
        .put('test.html', 'test');

      render(view, done, true);
    });
    
    it('should compile when provided a template file (function)', function(done) {
      expect(angular.element(view.el).text()).toBe('test');

      done();
    });
  });

  describe('Backbone.NgView', function() {
    var view;

    beforeEach(function(done) {
      view = new NgView({
        controllerAs: 'testCtrl'
      });

      render(view, done, true);
    });
    
    it('should assign the controller to the scope when controllerAs is provided', function(done) {
      expect(angular.element(view.el).scope().testCtrl).toBeDefined();

      done();
    });
  });

  describe('Backbone.NgView', function() {
    var view;
    var service;

    beforeEach(function(done) {
      view = new NgView({
        resolve: {
          service: '$q'
        },
        controller: function($scope, service) {
          $scope.service = service;
        }
      });

      render(view, done, true);
    });
    
    it('should pass resolved services to the controller (string)', function(done) {
      expect(angular.element(document).scope().service).toEqual(service);

      done();
    });
  });

  describe('Backbone.NgView', function() {
    var view;
    var service;

    beforeEach(function(done) {
      view = new NgView({
        resolve: {
          service: function() {
            return service;
          }
        },
        controller: function(service) {
          service.test();
        }
      });

      service = {
        test: function() {}
      };

      spyOn(service, 'test');

      render(view, done, true);
    });
    
    it('should pass resolved services to the controller (function)', function(done) {
      expect(service.test).toHaveBeenCalled();

      done();
    });
  });

  describe('Backbone.NgView', function() {
    var view;
    var service;

    beforeEach(function(done) {
      view = new NgView({
        resolve: {
          service: function() {
            var $q = angular.element(document).injector().get('$q');
            var deferred = $q.defer();

            setTimeout(function() {
              deferred.resolve(service);
            }, 0);

            return deferred.promise;
          }
        },
        controller: function(service) {
          service.test();
        }
      });

      service = {
        test: function() {}
      };

      spyOn(service, 'test');

      render(view, done, true);
    });
    
    it('should pass resolved services to the controller (promise)', function(done) {
      expect(service.test).toHaveBeenCalled();

      done();
    });
  });
})(Backbone.NgView);