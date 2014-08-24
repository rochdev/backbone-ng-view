module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'bower_components/underscore/underscore.js',
      'bower_components/backbone/backbone.js',
      'bower_components/angular/angular.js',
      'backbone-ng-view.js',
      'test/backbone-ng-view.spec.js'
    ],

    reporters: ['mocha', 'junit'],

    autoWatch: true,

    browsers: ['PhantomJS']
  });
};
