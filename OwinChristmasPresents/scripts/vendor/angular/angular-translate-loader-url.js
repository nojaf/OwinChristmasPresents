/*!
 * angular-translate - v2.1.0 - 2014-04-02
 * http://github.com/PascalPrecht/angular-translate
 * Copyright (c) 2014 ; Licensed MIT
 */
angular.module('pascalprecht.translate').factory('$translateUrlLoader', [
  '$q',
  '$http',
  function ($q, $http) {
    return function (options) {
      if (!options || !options.url) {
        throw new Error('Couldn\'t use urlLoader since no url is given!');
      }
      var deferred = $q.defer();
      $http({
        url: options.url,
        params: { lang: options.key },
        method: 'GET'
      }).success(function (data) {
        deferred.resolve(data);
      }).error(function (data) {
        deferred.reject(options.key);
      });
      return deferred.promise;
    };
  }
]);

angular.module('pascalprecht.translate').factory('$translateStaticFilesLoader', [
  '$q',
  '$http',
  function ($q, $http) {
      return function (options) {
          if (!options || (!angular.isString(options.prefix) || !angular.isString(options.suffix))) {
              throw new Error('Couldn\'t load static files, no prefix or suffix specified!');
          }
          var deferred = $q.defer();
          $http({
              url: [
                options.prefix,
                options.key,
                options.suffix
              ].join(''),
              method: 'GET',
              params: ''
          }).success(function (data) {
              deferred.resolve(data);
          }).error(function (data) {
              deferred.reject(options.key);
          });
          return deferred.promise;
      };
  }
]);
