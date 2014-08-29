/// <reference path="../typings/angular-translate/angular-translate.d.ts" />

module ChristmasPresents {
    angular.module("christmas", ['pascalprecht.translate']);

    export function getAngularModule() {
        return angular.module("christmas");
    }

    getAngularModule().run(["$http", "$translate","$location",translate]);

    function translate($http: ng.IHttpService, $translateProvider: ng.translate.ITranslateService, $location: ng.ILocationService) {
        var language = $location.path().split("#")[1] || "en";

        //$http.get("api/present/translate?lang=" + language).then(data => {

        //});
    }
} 