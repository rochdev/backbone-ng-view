# Backbone.NgView [![Build][build-image]][build-url] [![Version][version-image]][version-url] [![License][license-image]][license-url]

[![Greenkeeper badge](https://badges.greenkeeper.io/rochdev/backbone-ng-view.svg)](https://greenkeeper.io/)

The goal of this project is to be able to use AngularJS seamlessly from within Backbone projects. It allows you to create a Backbone view with its DOM managed by AngularJS. Ideal for slowly switching an application from Backbone to AngularJS.

## How to install

From your project root, run:

```sh
$ bower install backbone-ng-view
```

## Usage

The API is inspired from AngularJS [$routeProvider][route-provider-url] to provide a familiar usage.

The following options are supported and work the same way as their [$routeProvider][route-provider-url] counterpart:

  * `controller`
  * `controllerAs`
  * `template`
  * `templateUrl`
  * `resolve`

By default, the view will try to find an existing AngularJS [$rootScope][root-scope-url] directly on the document object. Thus, the easiest way to use it is to bootstrap the entire DOM using the [ng-app][ng-app-url] directive:

```html
<html ng-app="myApp">
  ...
</html>
```

```javascript
var view = new Backbone.NgView({
  template: '<span>Hello World!</span>'
});
```

Alternatively, you may pass a `modules` option to create a new [$rootScope][root-scope-url] attached directly to the Backbone view for one or several modules:

```javascript
var view = new Backbone.NgView({
  modules: ['myApp'],
  template: '<span>Hello World!</span>'
});
```

This allows you to create completely isolated AngularJS managed views. The `modules` option works the same way as the second argument of [angular.bootstrap][bootstrap-url].

See https://docs.angularjs.org/guide/bootstrap for more information about bootstrapping.

## Example

See the [example](example) folder for a complete example.

## License

[MIT License][license-url]

[angular-url]: https://angularjs.org
[backbone-url]: http://backbonejs.org
[bootstrap-url]: https://docs.angularjs.org/api/ng/function/angular.bootstrap
[build-image]: http://img.shields.io/travis/rochdev/backbone-ng-view.svg?style=flat-square
[build-url]: https://travis-ci.org/rochdev/backbone-ng-view
[license-image]: http://img.shields.io/badge/license-MIT-red.svg?style=flat-square
[license-url]: http://en.wikipedia.org/wiki/MIT_License
[ng-app-url]: https://docs.angularjs.org/api/ng/directive/ngApp
[root-scope-url]: https://docs.angularjs.org/api/ng/service/$rootScope
[route-provider-url]: https://docs.angularjs.org/api/ngRoute/provider/$routeProvider
[version-image]: http://img.shields.io/badge/release-0.1.2-orange.svg?style=flat-square
[version-url]: https://github.com/rochdev/backbone-ng-view