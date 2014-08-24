(function(Backbone, angular) {
  'use strict';

  var NgView = Backbone.NgView = Backbone.View.extend({
    initialize: function(options) {
      this.options = options || {};
    },

    render: function() {
      this._isRemoved = false;

      if (this.scope) {
        this.scope.$digest();

        return;
      }

      angular.element(document).ready(angular.bind(this, function() {
        if (!this._isReady) {
          this._loadServices();
        }

        if (!this.promise) {
          this.promise = this._getLocals().then(
            angular.bind(this, this._onSuccess),
            angular.bind(this, this._onError)
          );

          this.promise['finally'](angular.bind(this, function() {
            this.promise = null;
          }));
        }

        this._isReady = true;
      }));

      return this;
    },

    remove: function() {
      this._isRemoved = true;

      if (this.scope) {
        this.scope.$destroy();
        this.scope = null;
        this.controller = null;
      }

      return NgView.__super__.remove.apply(this, arguments);
    },

    _loadServices: function() {
      if (this.options.modules) {
        this.$injector = angular.bootstrap(this.el, this.options.modules);
      } else {
        this.$injector = angular.element(document).injector();
      }

      if (this.$injector === undefined) {
        throw new Error(
          'A valid $rootScope was not found. Please see ' +
          'https://github.com/rochdev/backbone-ng-view for valid ways to ' +
          'bootstrap your application.'
        );
      }

      this.$compile = this.$injector.get('$compile');
      this.$controller = this.$injector.get('$controller');
      this.$http = this.$injector.get('$http');
      this.$q = this.$injector.get('$q');
      this.$rootScope = this.$injector.get('$rootScope');
      this.$sce = this.$injector.get('$sce');
      this.$templateCache = this.$injector.get('$templateCache');
    },

    _getLocals: function() {
      var locals = angular.extend({}, this.options.resolve || {});
      var template = this._getTemplate();

      angular.forEach(locals, angular.bind(this, function(value, key) {
        if (angular.isString(value)) {
          locals[key] = this.$injector.get(value);
        } else {
          locals[key] = this.$injector.invoke(value);
        }
      }));

      if (angular.isDefined(template)) {
        locals.$template = template;
      }

      return this.$q.all(locals);
    },

    _getTemplate: function() {
      var template, templateUrl;

      if (angular.isDefined(template = this.options.template)) {
        if (angular.isFunction(template)) {
          template = template();
        }
      } else if (angular.isDefined(templateUrl = this.options.templateUrl)) {
        if (angular.isFunction(templateUrl)) {
          templateUrl = templateUrl();
        }

        templateUrl = this.$sce.getTrustedResourceUrl(templateUrl);

        if (angular.isDefined(templateUrl)) {
          template = this.$http.get(templateUrl, {cache: this.$templateCache})
            .then(function(response) {
              return response.data;
            });
        }
      }

      return template;
    },

    _onSuccess: function(locals) {
      if (this._isRemoved === false) {
        this.$el.html(locals.$template || '');

        this.scope = this.$rootScope.$new();
        this.controller = this.$controller(
          this.options.controller || function() {},
          angular.extend({
            $scope: this.scope
          }, locals)
        );

        if (this.options.controllerAs) {
          this.scope[this.options.controllerAs] = this.$controller;
        }

        this.$compile(this.el)(this.scope);
        this.trigger('ng:render:success');
      }
    },

    _onError: function(error) {
      this.trigger('ng:render:error', [error]);
    }
  });
})(Backbone, angular);