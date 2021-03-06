﻿/// <reference path="../typings/angular-translate/angular-translate.d.ts" />

module ChristmasPresents {
    angular.module("christmas", ['pascalprecht.translate']).config(["$translateProvider", translate]);

    export function getAngularModule() {
        return angular.module("christmas");
    }

    function translate($translateProvider: ng.translate.ITranslateProvider) {
        console.log($translateProvider);

        $translateProvider.useStaticFilesLoader({
            prefix: "/translations/",
            suffix: ".json"
        });

        var path: string = window.location.href.substr(window.location.href.length - 2, 2) || "en";
        if (path !== "en" && path !== "nl") path = "en";

        $translateProvider.preferredLanguage(path);
    }
} 